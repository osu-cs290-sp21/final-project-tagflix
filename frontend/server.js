const express = require('express')
const exphbs = require('express-handlebars')
const axios = require('axios')

const app = express()

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
  res.redirect('/page/1')
})

app.get('/page/:num', (req, res) => {
  if (parseInt(req.params.num) < 1) req.params.num = 1
  var queryNum = parseInt(req.params.num) - 1
  const url = 'http://localhost:5000/api/v1/movies?page=' + queryNum.toString()
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
    res.status(200).render('home', {
      movies: homeContext,
      page: (Number(req.params.num))
    })
  })
})

app.get('/movies/:id', (req, res) => {
  var movieId = req.params.id
  const url = 'http://localhost:5000/api/v1/movies/id/' + movieId
  axios.get(url).then(data => {
    var movieObj = {
      posterUrl: data.data.poster,
      rated: data.data.rated,
      imdb: data.data.imdb.rating,
      title: data.data.title,
      director: data.data.directors,
      year: data.data.year,
      fullPlot: data.data.fullplot,
      genres: data.data.genres.join(', '),
      tags: data.data.tags.join(', '),
      styles: ['/movie_style.css'],
      reviews: data.data.reviews
    }

    res.status(200).render('moviePage', movieObj)
  })
})



app.use(express.static("./public"))

app.listen(3000, () => {
  console.log('== Listening on port 3000');
})