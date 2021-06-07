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
app.get('/titles/:title', (req, res) => {
  var que = req.params.title
  const url = 'http://localhost:5000/api/v1/movies?title=' + que
  axios.get(url).then(data => {
    var movieArray = data.data.movies

    var homeContext = []
    for (var i = 0; i < movieArray.length; i++) {
      if (movieArray[i].title.search(que) != -1 && movieArray[i].poster != null) continue
      var movieObj = {
        title: movieArray[i].title,
        moviePageURL: "/movies/" + movieArray[i]._id,
        movieCoverURL: movieArray[i].poster,
      }
      homeContext.push(movieObj)
      if (homeContext.length >= 21) break
    }
    if(homeContext.length == 0)
      {
        res.status(404).render('404pg')
      }
      else{
        res.status(200).render('home', {
        movies: homeContext
      })
      }  
  })
})

app.get('/IMDB/:ratting', (req, res) => {
  var que = parseInt(req.params.ratting)
  const url = 'http://localhost:5000/api/v1/movies?IMDB=' + que.toString()
  axios.get(url).then(data => {
    var movieArray = data.data.movies
    var homeContext = []
    for (var i = 0; i < movieArray.length; i++) {
      if (movieArray[i].rating >= que && movieArray[i].poster != null) continue
      var movieObj = {
        title: movieArray[i].title,
        moviePageURL: "/movies/" + movieArray[i]._id,
        movieCoverURL: movieArray[i].poster,
      }
      homeContext.push(movieObj)
      if (homeContext.length >= 21) break
    }
    if(homeContext.length == 0)
      {
        res.status(404).render('404pg')
      }
      else{
        res.status(200).render('home', {
        movies: homeContext
      })
      }  
  })
})

app.get('/Year_Range/:years', (req, res) => {
  var que = req.params.years.toString()
  const url = 'http://localhost:5000/api/v1/movies?year_range=' + que
  var values = que.split("_")
  axios.get(url).then(data => {
    var movieArray = data.data.movies
    var homeContext = []
    for (var i = 0; i < movieArray.length; i++) {
      if (movieArray[i].year >= parseInt(values[0]) && movieArray[i].year <= parseInt(values[1]) )
      var movieObj = {
        title: movieArray[i].title,
        moviePageURL: "/movies/" + movieArray[i]._id,
        movieCoverURL: movieArray[i].poster,
      }
      homeContext.push(movieObj)
      if (homeContext.length >= 21) break
    }
    if(homeContext.length == 0)
      {
        res.status(404).render('404pg')
      }
      else{
        res.status(200).render('home', {
        movies: homeContext
      })
      }  
  })
})

app.get('/genras/:genra', (req, res) => {
  var que = req.params.genra
  const url = 'http://localhost:5000/api/v1/movies?genre=' + que
  axios.get(url).then(data => {
    var movieArray = data.data.movies
    que.toString()
    var flag = 0
    var homeContext = []
    for (var i = 0; i < movieArray.length; i++) {
      var temp = movieArray[i].genres
      for(var k = 0; k < temp.length; k++){
        if (que.search(temp[k]) == -1 && movieArray[i].poster != null){
          flag = 1
        }
    }
    if(flag == 0)
    {
      var movieObj = {
        title: movieArray[i].title,
        moviePageURL: "/movies/" + movieArray[i]._id,
        movieCoverURL: movieArray[i].poster,
      }
      homeContext.push(movieObj)
    }
    else{
      flag = 0;
    }
    
    if (homeContext.length >= 21) break
      }
      if(homeContext.length == 0)
      {
        res.status(404).render('404pg')
      }
      else{
        res.status(200).render('home', {
        movies: homeContext
      })
      }  
  })
})

app.get('/tags/:tag', (req, res) => {
  var que = req.params.tag
  if(que.toString().length == 0)
  {
    res.status(404).render('404pg')
  }
  const url = 'http://localhost:5000/api/v1/movies?tag=' + que
  axios.get(url).then(data => {
    var movieArray = data.data.movies
    que.toString()
    var flag = 0;
    var homeContext = []
    for (var i = 0; i < movieArray.length; i++) {
      var temp = movieArray[i].tags
      for(var k = 0; k < temp.length; k++){
        if (que.search(temp[k]) == -1 && movieArray[i].poster != null){
          flag = 1
        }
    }
    if( flag == 0)
    {
      var movieObj = {
        title: movieArray[i].title,
        moviePageURL: "/movies/" + movieArray[i]._id,
        movieCoverURL: movieArray[i].poster,
      }
      homeContext.push(movieObj)
    }
    else{
      flag = 0;
    }
    if (homeContext.length >= 21) break
      }
    if(homeContext.length == 0)
    {
      res.status(404).render('404pg')
    }
    else{
      res.status(200).render('home', {
      movies: homeContext
    })
    }  
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
      scripts: ['https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.runtime.js', '/reviewTemplate.js', '/movie_scripts.js'],
      reviews: data.data.reviews
    }

    res.status(200).render('moviePage', movieObj)
  })
})



app.use(express.static("./public"))

app.listen(3000, () => {
  console.log('== Listening on port 3000');
})