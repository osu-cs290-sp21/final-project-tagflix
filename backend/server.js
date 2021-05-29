import express from "express"
import cors from "cors"
import movies from "./api/movies.route.js"
import exphbs from "express-handlebars"
import MovieCtrl from "./api/movies.controller.js"
import moviesDAO from "./DAO/moviesDAO.js"


const app = express()

app.use(cors())
app.use(express.json()) // allows server to accept json requests
app.use("/api/v1/movies", movies)



app.use("*", (req, res)=> res.status(404).json({error: "page not found"}))
export default app
