var admovie = document.getElementById('submit')
var master_genre_list = "Action Adventure Animation Biography Comedy Crime Documentary Drama Family Fantasy Film-Noir History Horror Music Musical Mystery News Romance Sci-Fi Short Sport Talk-Show Thriller War Western"

admovie.addEventListener('click', () =>{
    var plot1 = document.getElementById('plot-input').value.toString()
    var title1 = document.getElementById('title-input').value.toString()
    var year1 = document.getElementById('year-input').value.toString()
    var director1 = document.getElementById('director-input').value.toString()
    var image1 = document.getElementById('image-link').value.toString()
    var rating1 = document.getElementById('rating-input').value.toString()
    var genre1 = document.getElementById('genre-input').value.toString()
    var tag1 = document.getElementById('tag-input').value.toString()

    if(plot1 && title1 && year1 && director1 && image1 && rating1 && genre1 && tag1) //checks for all input boxes to have infomation in them
    {
      var request = new XMLHttpRequest()
      request.open('POST', 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/movie-new')
      request.setRequestHeader('Content-Type', 'application/json')

      var director_list = director1.split(",");//splits director names at commas
      var genre_list = genre1.split(" ");//splits genre at the space between each one
      var tag_list = tag1.split(" ");//splits tags at the space between each one

      var flag = 0;
      for(var i = 0; i < genre_list.length;i++)
      {
        if(master_genre_list.search(genre_list[i]) == -1)
        {
            flag = 1
            alert("Invalid genre detected, please refer to genre dropdown above for valid options")
            break;
        }
      }
  
      if(flag == 0)
      {
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
        var requestBody = JSON.stringify(newmovie) //packages as a json and sends to API
        request.send(requestBody)
        location.href = '/'
       
      }
    }
    else {
      alert("Not all infomation has been filled in");
    }

})
