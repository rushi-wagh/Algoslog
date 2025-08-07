import { db } from "../libs/db.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const getAllPlayListDetails = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const Playlists = await db.playlist.findMany({
    where: {
      userId,
    },
  });

  if (!Playlists) {
    throw new ApiError(404, "No playlist found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, Playlists, "all playlists fetched"));
});

export const getPlayListDetails = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!playlistId) {
    throw new ApiError(401, "No id provided");
  }

  const Playlist = await db.playlist.findUnique({
    where: {
      id: playlistId,
    },
  });
  if (!Playlist) {
    throw new ApiError(404, "No playlist found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, Playlist, "Playlist fetched with given id"));
});

export const createPlayList = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    throw new ApiError(401, "Name is required");
  }
  const userId = req.user.id;

  const Playlist = await db.playlist.create({
    data: {
      name,
      description,
      userId,
    },
  });
  if (!Playlist) {
    throw new ApiError(500, "Error while creating problem");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, Playlist, "playlist created succesfully"));
});
export const addProblemToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  if (!playlistId) {
    throw new ApiError(400, "No playlistId provided");
  }

  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    throw new ApiError(400, "Please provide problemIds as a non-empty array");
  }

  const problemsInPlaylist = await db.problemInPlaylist.createMany({
    data: problemIds.map((problemId) => ({
      playlistId,
      problemId,
    })),
    skipDuplicates: true, 
  });

  if (!problemsInPlaylist) {
    throw new ApiError(500, "Error while adding problems to playlist");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      problemsInPlaylist,
      "Added problems successfully to the playlist"
    )
  );
});

export const deletePlayList = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!playlistId) {
    throw new ApiError(401, "No id provided");
  }
  const deletedPlaylist = await db.playlist.delete({
    where: {
      id: playlistId,
    },
  });

  return res.status(200, deletePlayList, "playlist deleted succesfully");
});
export const removeProblemFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  
  const { problemIds } = req.body;
  if (!playlistId) {
    throw new ApiError(401, "No id provided");
  }

  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    throw new ApiError(401, "Please provide problem ids in array");
  }

  const deletedProblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deletedProblem,
        "all given problems deleted succesfully"
      )
    );
});
