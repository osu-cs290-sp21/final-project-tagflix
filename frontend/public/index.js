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
    location.href = '/genras/' + input
  }
  else if(filer.localeCompare("IMDB_Ratting") == 0)
  {
    location.href = '/IMDB/' + input
  }
  else if(filer.localeCompare("Tags") == 0)
  {
    location.href = '/tags/' + input
  }

})

