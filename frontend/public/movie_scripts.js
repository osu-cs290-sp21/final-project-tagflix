var addTagButton = document.getElementById('add-tag-button')
addTagButton.addEventListener('click', () => {
  var hiddenElem = document.getElementById('modal-backdrop')
  hiddenElem.classList.remove('hidden')
  hiddenElem = document.getElementById('add-tag-modal')
  hiddenElem.classList.remove('hidden')
})

var addReviewButton = document.getElementById('add-review-button')
addReviewButton.addEventListener('click', () => {
  var hiddenElem = document.getElementById('modal-backdrop')
  hiddenElem.classList.remove('hidden')
  hiddenElem = document.getElementById('add-review-modal')
  hiddenElem.classList.remove('hidden')
})

var tagCancelButton = document.getElementsByClassName('modal-cancel-button')[0]
var tagCloseButton = document.getElementsByClassName('modal-close-button')[0]
var tagAcceptButton = document.getElementsByClassName('modal-accept-button')[0]
tagCancelButton.addEventListener('click', hideTagModal)
tagCloseButton.addEventListener('click', hideTagModal)
tagAcceptButton.addEventListener('click', () => {
  // send put request to http://localhost:5000/api/v1/movies/tags
  hideTagModal();
})


var reviewCancelButton = document.getElementsByClassName('modal-cancel-button')[1]
var reviewCloseButton = document.getElementsByClassName('modal-close-button')[1]
var reviewAcceptButton = document.getElementsByClassName('modal-accept-button')[1]
reviewCancelButton.addEventListener('click', hideReviewModal)
reviewCloseButton.addEventListener('click', hideReviewModal)
reviewAcceptButton.addEventListener('click', () => {
  // send post request to http://localhost:5000/api/v1/movies/review
  hidereivewModal();
})


function hideTagModal() {
  var hiddenElem = document.getElementById('modal-backdrop')
  hiddenElem.classList.add('hidden')
  hiddenElem = document.getElementById('add-tag-modal')
  hiddenElem.classList.add('hidden')
  var textInput = document.getElementById('new-tags-input')
  textInput.value = ''
}

function hideReviewModal() {
  var hiddenElem = document.getElementById('modal-backdrop')
  hiddenElem.classList.add('hidden')
  hiddenElem = document.getElementById('add-review-modal')
  hiddenElem.classList.add('hidden')
  var textInput = document.getElementById('review-text-input')
  textInput.value = ''
  textInput = document.getElementById('review-userid-input')
  textInput.value = ''
  textInput = document.getElementById('review-username-input')
  textInput.value = ''
}