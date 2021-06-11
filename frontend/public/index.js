// Searching -------------------------------------------------------------------
var dropdown = document.getElementById('filters') //change placeholder text depending on option selected

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

var searchinput = document.getElementById('main-search-button') //sends link based on option selected and input infomation

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

// Checks for "enter" key presses to trigger search
document.getElementById('main-search-input').addEventListener('keyup', (event) => {
   if (event.keyCode === 13) {
     event.preventDefault()
     document.getElementById('main-search-button').click()
   }
})

//------------------------------------------------------------------------------

var pageButtons = document.getElementsByClassName('page-button')

if (pageButtons.length) {
  // previous page
  pageButtons[0].addEventListener('click', () => {
    var currentPage = parseInt(document.getElementsByClassName('page-number')[0].innerText)
    if (!currentPage) return
    currentPage--
    currentPage = currentPage.toString()

    location.href = '/page/' + currentPage
  })
  // next page
  pageButtons[1].addEventListener('click', () => {
    var currentPage = parseInt(document.getElementsByClassName('page-number')[0].innerText)
    currentPage++
    currentPage = currentPage.toString()
    location.href = '/page/' + currentPage
  })
}
