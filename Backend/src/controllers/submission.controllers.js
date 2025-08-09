import { db } from "../libs/db.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const getAllSubmission = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const submissions = await db.submission.findMany({
    where: {
      userId,
    },
  });
  if (!submissions) {
    throw new ApiError(404, "no submission found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, submissions, "All submissions fetched succesfully")
    );
});
export const getSubmissionsForProblem = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  if (!problemId) {
    throw new ApiError(401, "Id is required");
  }
  const userId = req.user.id;
  const submission = await db.submission.findMany({
    where: {
      userId,
      problemId,
    },
  });
  if (!submission) {
    throw new ApiError(404, "No sbmission found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        submission,
        "All submissions fetched succesfully for given problem id"
      )
    );
});

export const getAllTheSubmissionsForProblem = asyncHandler(async (req, res) => {
  const { problemId } = req.params;
  if (!problemId) {
    throw new ApiError(401, "Id is required");
  }
  const submissionCount = await db.submission.count({
    where: {
      problemId,
    },
  });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        submissionCount,
        "All submissions count fetched succesfully"
      )
    );
});
