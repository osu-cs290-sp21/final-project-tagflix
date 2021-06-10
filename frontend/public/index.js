var pageButtons = document.getElementsByClassName('page-button')

pageButtons[0].addEventListener('click', () => {
  var currentPage = parseInt(document.getElementsByClassName('page-number')[0].innerText)
  if (!currentPage) return
  currentPage--
  currentPage = currentPage.toString()

  location.href = '/page/' + currentPage
})

pageButtons[1].addEventListener('click', () => {
  var currentPage = parseInt(document.getElementsByClassName('page-number')[0].innerText)
  currentPage++
  currentPage = currentPage.toString()
  location.href = '/page/' + currentPage
})

var dropdown = document.getElementById('filters')

dropdown.addEventListener('change', () => {
  var filer = dropdown.value;
  if(filer.localeCompare("Title") == 0)
  {
      document.getElementById('main-search-input').placeholder = "Search Title"
  }
  else if(filer.localeCompare("Genre") == 0)
  {
      document.getElementById('main-search-input').placeholder = "Genre1_Genre2"
  }
  else if(filer.localeCompare("IMDB_Rating") == 0)
  {
      document.getElementById('main-search-input').placeholder = "Lowest IMDB rating"
  }
  else if(filer.localeCompare("Tags") == 0)
  {
      document.getElementById('main-search-input').placeholder = "Tags to search"
  }
  else if(filer.localeCompare("Year_Range") == 0)
  {
      document.getElementById('main-search-input').placeholder = "Year1_Year2"
  }
  
})

var searchinput = document.getElementById('main-search-button')

searchinput.addEventListener('click', () => {
  var input = document.getElementById('main-search-input').value;
  input.toString();
  var e = document.getElementById('filters');
  var filer = e.value;
  filer.toString();
  if(filer.localeCompare("Title") == 0)
  {
      location.href = '/titles/' + input
  }
  else if(filer.localeCompare("Genre") == 0)
  {
    location.href = '/genres/' + input
  }
  else if(filer.localeCompare("IMDB_Rating") == 0)
  {
    location.href = '/IMDB/' + input
  }
  else if(filer.localeCompare("Tags") == 0)
  {
    location.href = '/tags/' + input
  }
  else if(filer.localeCompare("Year_Range") == 0)
  {
    location.href = '/Year_Range/' + input
  }

})

var admovie = document.getElementById('submit')

admovie.addEventListener('click', () =>{
 
  
  hiddenElem = document.getElementById('add-movie-modal')
  hiddenElem.classList.remove('hidden')
    // var plot1 = document.getElementById('plot-input')
    // var title1 = document.getElementById('title-input')
    // var year1 = document.getElementById('year-input')
    // var director1 = document.getElementById('director-input')
    // var year1 = document.getElementById('year-input')
    // var image1 = document.getElementById('image-link')
    // var rating1 = document.getElementById('rating-input')
    // var genre1 = document.getElementById('genre-input')
    // var tag1 = document.getElementById('tag-input')

    // var request = new XMLHttpRequest()
    // request.open('POST', 'http://localhost:5000/api/v1/movies/addMovie')
    // request.setRequestHeader('Content-Type', 'application/json')

    // director1.toString()
    // var director_list = director1.split(" ")
    // genre1.toString()
    // var genre_list = genre1.split(" ")
    // tag1.toString()
    // var tag_list = tag1.split(" ")

    // var newmovie  = {
    //     title: title1.toString(),
    //     plot: plot1.toString(),
    //     genres: genre_list,
    //     year: parseInt(year1),
    //     poster: image1.toString(),
    //     tags: tag_list,
    //     directors: director_list,
    //     rated: rating1.toString(),
    // }
    // var requestBody = JSON.stringify(newmovie)
    // request.send(requestBody)
    //location.href = '/awdawd'
})

    
