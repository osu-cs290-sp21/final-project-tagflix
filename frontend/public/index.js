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
  else if(filer.localeCompare("IMDB_Ratting") == 0)
  {
      document.getElementById('main-search-input').placeholder = "Lowest IMDB ratting"
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

