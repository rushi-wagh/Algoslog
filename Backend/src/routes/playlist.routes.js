import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { addProblemToPlaylist, createPlayList, deletePlayList, getAllPlayListDetails, getPlayListDetails, removeProblemFromPlaylist } from "../controllers/playlist.controllers.js"

const playlistRoutes = express.Router()

playlistRoutes.get("/" , authMiddleware , getAllPlayListDetails)

playlistRoutes.get("/:playlistId" , authMiddleware , getPlayListDetails)

playlistRoutes.post("/create-playlist" ,authMiddleware ,  createPlayList)



playlistRoutes.post('/:playListId/add-problem' , authMiddleware , addProblemToPlaylist)

playlistRoutes.delete("/:playListId" , authMiddleware , deletePlayList)

playlistRoutes.delete("/:playListId/remove-problem" , authMiddleware , removeProblemFromPlaylist)

export default playlistRoutes