var admovie = document.getElementById('submit')

admovie.addEventListener('click', () =>{
    var plot1 = document.getElementById('plot-input')
    var title1 = document.getElementById('title-input')
    var year1 = document.getElementById('year-input')
    var director1 = document.getElementById('director-input')
    var year1 = document.getElementById('year-input')
    var image1 = document.getElementById('image-link')
    var rating1 = document.getElementById('rating-input')
    var genre1 = document.getElementById('genre-input')
    var tag1 = document.getElementById('tag-input')

    var request = new XMLHttpRequest()
    request.open('POST', 'http://localhost:5000/api/v1/movies/addMovie')
    request.setRequestHeader('Content-Type', 'application/json')

    director1.toString()
    var director_list = director1.split(" ")
    genre1.toString()
    var genre_list = genre1.split(" ")
    tag1.toString()
    var tag_list = tag1.split(" ")

    var newmovie  = {
        title: title1.toString(),
        plot: plot1.toString(),
        genres: genre_list,
        year: parseInt(year1),
        poster: image1.toString(),
        tags: tag_list,
        directors: director_list,
        rated: rating1.toString(),
    }
    var requestBody = JSON.stringify(newmovie)
    request.send(requestBody)
  
})