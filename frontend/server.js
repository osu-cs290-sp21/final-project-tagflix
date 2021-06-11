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
  const url = 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/movies?page=' + queryNum.toString()
  axios.get(url).then(data => {
    var movieArray = data.data.movies

    var homeContext = []
    for (var i = 0; i < movieArray.length; i++) {
      if (!movieArray[i].poster) continue
      var title = movieArray[i].title
      if (title.length > 25) title = title.slice(0, 22) + ' ...'
      var movieObj = {
        title: title,
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

// These functions were adapted from this post: https://stackoverflow.com/questions/52669596/promise-all-with-axios/52669775
function getAllData(tagData){
  return Promise.all(tagData.map(fetchData));
}

function fetchData(tagData) {
  return axios
    .get(tagData.url)
    .then(function(response) {
      movieArray = response.data.movies
      return movieObj = {
        title: tagData.tag,
        moviePageURL: "/tags/" + tagData.tag,
        movieCoverURL: movieArray[0].poster
      }
    })
    .catch(e => console.log(`error creating movie objets: ${e}`));
}

app.get('/tagPage', (req, res) => { //pulls all tags and displays on page
  const url = 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/tags'
   axios.get(url).then(async response => {
    var homeContext
    var tagData = []
    tagsArray = response.data;
    tagsArray.forEach((tag) => {
      const tagStuff = {
      url: 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/movies?tag=' + tag,
      tag: tag
      }
      tagData.push(tagStuff)
    })
    homeContext = await getAllData(tagData)

    res.status(200).render('tags', {
      movies: homeContext,
      page: (Number(req.params.num))
    })
  }).catch(e => console.log(`error getting tags: ${e}`));
})


app.get('/titles/:title', (req, res) => {
  var que = '"' + req.params.title + '"'
  const url = 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/movies?title=' + que
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
    if (homeContext.length == 0) {
      res.status(200).render('no_results')
    } else {
      res.status(200).render('home', {
        movies: homeContext
      })
    }
  })
})

app.get('/IMDB/:rating', (req, res) => {
  var que = parseInt(req.params.rating)
  const url = 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/movies?IMDB=' + que.toString()
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
    if (homeContext.length == 0) {
      res.status(200).render('no_results')
    } else {
      res.status(200).render('home', {
        movies: homeContext
      })
    }
  })
})

app.get('/Year_Range/:years', (req, res) => {
  var que = req.params.years
  const url = 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/movies?year_range=' + que
  //var values = que.split("_")
  axios.get(url).then(data => {
    var movieArray = data.data.movies
    var homeContext = []
    for (var i = 0; i < movieArray.length; i++) {
        var movieObj = {
          title: movieArray[i].title,
          moviePageURL: "/movies/" + movieArray[i]._id,
          movieCoverURL: movieArray[i].poster,
        }
      homeContext.push(movieObj)
      if (homeContext.length >= 21) break
    }
    if (homeContext.length == 0) {
      res.status(200).render('no_results')
    } else {
      res.status(200).render('home', {
        movies: homeContext
      })
    }
  })
})


app.get('/genres/:genre', (req, res) => {
  var que = req.params.genre
  const url = 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/movies?genre=' + que
  axios.get(url).then(data => {
    var movieArray = data.data.movies
    que.toString()
    var homeContext = []
    for (var i = 0; i < movieArray.length; i++) {
      var temp = movieArray[i].genres
      for(var k = 0; k < temp.length; k++){
        if (que.search(temp[k]) != -1 && movieArray[i].poster != null){
          var movieObj = {
            title: movieArray[i].title,
            moviePageURL: "/movies/" + movieArray[i]._id,
            movieCoverURL: movieArray[i].poster,
          }
          homeContext.push(movieObj)
          break;
        }
    }
    if (homeContext.length >= 21) break
      }
      if(homeContext.length == 0)
      {
        res.status(200).render('no_results')
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
  if (que.toString().length == 0) {
    res.status(404).render('404pg')
  }
  const url = 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/movies?tag=' + que
  axios.get(url).then(data => {
    var movieArray = data.data.movies
    que.toString()
    var homeContext = []
    for (var i = 0; i < movieArray.length; i++) {
      var temp = movieArray[i].tags
      for (var k = 0; k < temp.length; k++) {
        if (que.search(temp[k]) != -1) {
          var movieObj = {
            title: movieArray[i].title,
            moviePageURL: "/movies/" + movieArray[i]._id,
            movieCoverURL: movieArray[i].poster,
          }
          homeContext.push(movieObj)
          break
        }
      }
      if (homeContext.length >= 21) break
    }


    if (homeContext.length == 0) {
      res.status(200).render('no_results', {scripts: ["/index.js"]})
    } else {
      res.status(200).render('home', {
        movies: homeContext
      })
    }
  })
})



app.get('/movies/:id', (req, res) => {
  var movieId = req.params.id
  const url = 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/movie?id=' + movieId
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

app.get('/add-movie/', (req, res) => {

  var scripts =  ['https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.runtime.js', '/addmovie_scripts.js']
  res.status(200).render('addmoviepg', {scripts} )

})

app.use(express.static("./public"))

app.get('*', (req, res) => {
  res.status(404).render('404pg')
})

var port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('== Listening on port', port);
})
