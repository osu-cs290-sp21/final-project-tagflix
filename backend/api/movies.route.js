import express from "express"
import MoviesCtrl from "./movies.controller.js"
const router = express.Router()
router.route("/").get(MoviesCtrl.apiGetMovies)
export default router