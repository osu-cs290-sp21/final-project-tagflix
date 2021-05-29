const express = require('express')
const exphbs = require('express-handlebars')
const axios = require('axios')

const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
  const url = 'http://localhost:5000/api/v1/movies?page=0'
  axios.get(url).then(data => {
    var movieArray = data.data.movies

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
    res.status(200).render('home', {movies: homeContext})
  })
})

app.get('/movies/:id', (req, res) => {
  var movieId = req.params.id
  const url = 'http://localhost:5000/api/v1/movies/id/' + movieId
  axios.get(url).then(data => {
    var movieObj = {
      movieTitle: data.data.title,
      director: data.data.directors,
      year: data.data.year,
      posterURL: data.data.poster,
      rating: data.data.rated,
      genres: data.data.genres,
      plot: data.data.plot,
      tags: data.data.tags
    }

    res.status(200).render('moviePage', movieObj)
  })
})


app.use(express.static("./public"))

app.listen(3000)
