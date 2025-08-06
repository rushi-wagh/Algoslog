import {
  getJudge0LanguageId,
  submitBatch,
  pollBatchResults,
  getLanguageName,
} from "../libs/judge0.lib.js";
import { db } from "../libs/db.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const executeCode = asyncHandler(async (req, res) => {
  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;
  const userId = req.user.id;

  if (
    !Array.isArray(stdin) ||
    stdin.length === 0 ||
    !Array.isArray(expected_outputs) ||
    expected_outputs.length !== stdin.length
  ) {
    throw new ApiError(400, "Testcases are not in supporting format");
  }
  // step 2 prepare test cases for submission
  const submissions = stdin.map((input) => ({
    source_code,
    language_id,
    stdin: input,
  }));
  // step 3 obtain tokens
  const submitResponse = await submitBatch(submissions);
  const tokens = submitResponse.map((res) => res.token);

  // poll judge0
  const results = await pollBatchResults(tokens);

  console.log("REsults------------------------");
  console.log(results);

  // analyse test cases results
  let allPassed = true;
  const detailedResult = results.map((result, i) => {
    const stdout = result.stdout?.trim();
    const expected_output = expected_outputs[i]?.trim();
    const passed = stdout === expected_output;

    if (!passed) allPassed = false; // if test cases is failed will make allpased as false even if it pass for other cases

    return {
      testcases:i + 1,
      passed,
      stdout,
      expected: expected_output,
      stderr: result.stderr || null,
      compile_output: result.compile_output || null,
      status: result.status.description,
      memory: result.memory ? `${result.memory} KB` : undefined,
      time: result.time ? `${result.time} s` : undefined,
    };
  });
  // console.log("detailed/n",detailedResult)
  //store submission result

  const submission = await db.submission.create({
    data: {
      userId,
      problemId,
      sourceCode: source_code,
      language: getLanguageName(language_id),
      stdin: stdin.join("\n"),
      stdout: JSON.stringify(detailedResult.map((r) => r.stdout)),
      stderr: detailedResult.some((r) => r.stderr)
        ? JSON.stringify(detailedResult.map((r) => r.stderr))
        : null,
      compileOutput: detailedResult.some((r) => r.compile_output)
        ? JSON.stringify(detailedResult.map((r) => r.compile_output))
        : null,
      status: allPassed ? "Accepted" : "Wrong Answer",
      memory: detailedResult.some((r) => r.memory)
        ? JSON.stringify(detailedResult.map((r) => r.memory))
        : null,
      time: detailedResult.some((r) => r.time)
        ? JSON.stringify(detailedResult.map((r) => r.time))
        : null,
    },
  });
  // if all passed mark problem as solved
  if (allPassed) {
    await db.problemSolved.upsert({
      where: {
        userId_problemId: { userId, problemId },
      },
      update: {},
      create: {
        userId,
        problemId,
      },
    });
  }
  // 8. Save individual test case results  using detailedResult

  const testCaseResults = detailedResult.map((result) => ({
    submissionId: submission.id,
    testCase: result.testcases,
    passed: result.passed,
    stdout: result.stdout,
    expected: result.expected,
    stderr: result.stderr,
    compileOutput: result.compile_output,
    status: result.status,
    memory: result.memory,
    time: result.time,
  }));
  await db.testCaseResult.createMany({
    data: testCaseResults,
  });
  const submissionWithTestCase = await db.submission.findUnique({
    where: {
      id: submission.id,
    },
    include: {
      testCases: true,
    },
  });
  return res
    .status(200)
    .json(
      new ApiResponse(200, submissionWithTestCase, "Code Executed! Succesfully")
    );
});
