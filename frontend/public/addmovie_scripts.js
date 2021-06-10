var admovie = document.getElementById('submit')

admovie.addEventListener('click', () =>{
    var plot1 = document.getElementById('plot-input').value.toString()
    var title1 = document.getElementById('title-input').value.toString()
    var year1 = document.getElementById('year-input').value.toString()
    var director1 = document.getElementById('director-input').value.toString()
    var image1 = document.getElementById('image-link').value.toString()
    var rating1 = document.getElementById('rating-input').value.toString()
    var genre1 = document.getElementById('genre-input').value.toString()
    var tag1 = document.getElementById('tag-input').value.toString()

    if(plot1 && title1 && year1 && director1 && image1 && rating1 && genre1 && tag1)
    {
      var request = new XMLHttpRequest()
      request.open('POST', 'http://localhost:5000/api/v1/movies/addMovie')
      request.setRequestHeader('Content-Type', 'application/json')

      var director_list = director1.split(" ");
      var genre_list = genre1.split(" ");
      var tag_list = tag1.split(" ");

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
      location.href = '/'
    }
    else {
      alert("Not all infomation has been filled in");
    }

})
