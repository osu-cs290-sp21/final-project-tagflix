import express from "express"
import cors from "cors"
import movies from "./api/movies.route.js"
import exphbs from "express-handlebars"
import MovieCtrl from "./api/movies.controller.js"
import moviesDAO from "./DAO/moviesDAO.js"


const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(cors())
app.use(express.json()) // allows server to accept json requests
app.use("/api/v1/movies", movies)

function getHomeContent(obj) {
  var movieArray = obj.moviesList

  var homeContext = []

  for (var i = 0; i < movieArray.length; i++) {
    if (!movieArray[i].poster) continue
    var movieObj = {
      title: movieArray[i].title,
      moviePageURL: "/movies/" + movieArray[i]._id,
      movieCoverURL: movieArray[i].poster,
    }
    homeContext.push(movieObj)
    if (homeContext.length >= 21) break
  }
  return homeContext
}

app.get('/', async function (req, res) {
  var data = await moviesDAO.getMovies({
      "page": 1,
      "entriesPerPage": 30
  })

  var homeContext = getHomeContent(data)

  res.status(200).render('home', {movies: homeContext})
})

app.use(express.static("../frontend"))


app.use("*", (req, res)=> res.status(404).json({error: "page not found"}))
export default app
