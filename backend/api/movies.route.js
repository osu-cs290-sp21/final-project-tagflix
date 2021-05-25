import express from "express"
import MoviesCtrl from "./movies.controller.js"

import ReviewsCtrl from "./reviews.controller.js"
//import TagsCtrl from "./tags.controller.js"

const router = express.Router()
router.route("/").get(MoviesCtrl.apiGetMovies)


router
   .route('/review')
   .post(ReviewsCtrl.apiPostReview)
   .put(ReviewsCtrl.apiUpdateReview)
   .delete(ReviewsCtrl.apiDeleteReview)



export default router