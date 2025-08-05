import {
  getJudge0LanguageId,
  submitBatch,
  pollBatchResults,
} from "../libs/judge0.lib.js";
import { db } from "../libs/db.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const createProblem = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testCases,
    codeSnippet,
    hints,
    editorial,
    referenceSolution,
  } = req.body;

  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json(
        new ApiResponse(403, null, "You are not allowed to create Problem")
      );
  }
  try {
    // object.entries value return key value pair
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        throw new ApiError(400, `Language ${language} is not supported`);
      }
      //
      const submissions = testCases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);
      const tokens = submissionResults.map((res) => res.token);
      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        // console.log("Result",result)
        if (result.status.id !== 3) {
          throw new ApiError(
            400,
            `Reference solution for ${language} failed on test case ${i + 1}`
          );
        }
      }

      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testCases,
          codeSnippet,
          referenceSolution,
          userId: req.user.id,
        },
      });

      return res
        .status(201)
        .json(new ApiResponse(201, newProblem, "Problem created Succesfully"));
    }
  } catch (error) {
    console.log(error.message);
    throw new ApiError(500, "Error while creating problem");
  }
});



export const getProblemById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "no id provided");
  }

  const Problem = await db.problem.findUnique({
    where: {
      id,
    },
  });
  if (!Problem) {
    throw new ApiError(404, "No problem found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, Problem, "Problem fetched succesfully"));
});

export const deleteProblem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "no id provided");
  }
  const Problem = await db.problem.findUnique({
    where: {
      id,
    },
  });
  if (!Problem) {
    throw new ApiError(404, "No problem found");
  }
  const deletedProblem = await db.problem.delete({
    where: {
      id,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, deletedProblem, "Problem deleted succesfully"));
});

export const updateProblem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "no id provided");
  }
  const Problem = await db.problem.findUnique({
    where: {
      id,
    },
  });
  if (!Problem) {
    throw new ApiError(404, "No problem found");
  }
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testCases,
    codeSnippet,
    hints,
    editorial,
    referenceSolution,
  } = req.body;

  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json(
        new ApiResponse(403, null, "You are not allowed to create Problem")
      );
  }
  
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        throw new ApiError(400, `Language ${language} is not supported`);
      }

      const submissions = testCases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));
      const submissionResults = await submitBatch(submissions)
      console.log(submissionResults)
      const tokens = submissionResults.map((res) => res.token);
      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Reference solution for ${language} failed on test case ${
              i + 1
            }`,
          });
        }
        }
      }
        const updatedProblem = await db.problem.update({
          where:{
            id
          },
          data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testCases,
          codeSnippet,
          referenceSolution,
          userId: req.user.id,
        }
        })
       
        if(!updatedProblem){
          throw new ApiError(400,"ERror while updating problem")
        }
        return res.status(200).json(
          new ApiResponse(200,updatedProblem,"Problem updated succesfully")
        )
      
    
});
export const getAllProblems = asyncHandler(async (req, res) => {
    const problems = await db.problem.findMany();
    if (!problems) {
     throw new ApiError(404,"No problem found")
    }
    console.log(problems.length)

    res.status(200).json(new ApiResponse(200,problems,"All problems fetched succesfully"));
});
