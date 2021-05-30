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