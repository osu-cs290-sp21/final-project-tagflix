/* Tag Functionallity */

var addTagButton = document.getElementById('add-tag-button')
addTagButton.addEventListener('click', () => {
  var elem = document.querySelectorAll('.modal-header h3')[0]
  elem.innerText = 'Add Tags'
  elem = document.querySelectorAll('.input-element label')[0]
  elem.innerText = 'Tags:'
  elem = document.getElementsByClassName('modal-accept-button')[0]
  elem.innerText = 'Submit'
  elem = document.getElementById('new-tags-input')
  elem.placeholder = "e.g. funny thrilling..."

  var hiddenElem = document.getElementById('modal-backdrop')
  hiddenElem.classList.remove('hidden')
  hiddenElem = document.getElementById('add-tag-modal')
  hiddenElem.classList.remove('hidden')
})

var tagCancelButton = document.getElementsByClassName('modal-cancel-button')[0]
var tagCloseButton = document.getElementsByClassName('modal-close-button')[0]
var tagAcceptButton = document.getElementsByClassName('modal-accept-button')[0]
tagCancelButton.addEventListener('click', hideTagModal)
tagCloseButton.addEventListener('click', hideTagModal)
tagAcceptButton.addEventListener('click', () => {
  var url = 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/tag-add'
  var request = new XMLHttpRequest()
  request.open('PUT', url)
  request.setRequestHeader('Content-Type', 'application/json')

  var userInput = document.getElementById('new-tags-input').value
  var newTagsArray = userInput.split(' ')

  var tagsObj = {
    movie_id: location.pathname.split('/')[2],
    tags: newTagsArray
  }
  var requestBody = JSON.stringify(tagsObj)
  request.addEventListener('load', event => {
    if (event.target.status !== 200) {
      var message = event.target.response;
      alert("Error adding tags: " + message)
    } else {
      tagsElem = document.querySelector('.tags p')
      tagsElem.innerText += ' ' + newTagsArray.toString()
      hideTagModal()
      location.reload()
    }
  })
  request.send(requestBody)
})
// ----------------------------------------------------------------------------

/* Review Functionallity */

var addReviewButton = document.getElementById('add-review-button')
addReviewButton.addEventListener('click', () => {
  var elem = document.querySelectorAll('.modal-header h3')[1]
  elem.innerText = 'Add a Review'
  elem = document.querySelectorAll('.modal-accept-button')[1]
  elem.innerText = 'Post'

  var hiddenElem = document.getElementById('modal-backdrop')
  hiddenElem.classList.remove('hidden')
  hiddenElem = document.getElementById('add-review-modal')
  hiddenElem.classList.remove('hidden')

  reviewAcceptButton.addEventListener('click', () => {
    var request = new XMLHttpRequest()
    request.open('POST', 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/review-new')
    request.setRequestHeader('Content-Type', 'application/json')


    var reviewObj = {
      movie_id: location.pathname.split('/')[2],
      text: document.getElementById('review-text-input').value,
      user_id: document.getElementById('review-userid-input').value,
      name: document.getElementById('review-username-input').value
    }
    requestBody = JSON.stringify(reviewObj)

    request.addEventListener('load', event => {
      if (event.target.status !== 200) {
        var message = event.target.response;
        alert("Error storing review: " + message);
      } else {
        var reviewContext = {
          name: document.getElementById('review-username-input').value,
          text: document.getElementById('review-text-input').value
        }
        var reviewHTML = Handlebars.templates.review(reviewContext)
        document.getElementsByClassName('review-container')[0].insertAdjacentHTML('afterbegin', reviewHTML)
        hideReviewModal()
        location.reload()
      }
    })
    request.send(requestBody)
  })
})


var reviewCancelButton = document.getElementsByClassName('modal-cancel-button')[1]
var reviewCloseButton = document.getElementsByClassName('modal-close-button')[1]
var reviewAcceptButton = document.getElementsByClassName('modal-accept-button')[1]
var deleteCancelButton = document.getElementsByClassName('modal-cancel-button')[2]
var deleteCloseButton = document.getElementsByClassName('modal-close-button')[2]
reviewCancelButton.addEventListener('click', hideReviewModal)
reviewCloseButton.addEventListener('click', hideReviewModal)
deleteCancelButton.addEventListener('click', hideDeleteModal)
deleteCloseButton.addEventListener('click', hideDeleteModal)

//updating the review

var editButtons = document.getElementsByClassName('update-review')
var deleteButtons = document.getElementsByClassName('delete-review')

Array.from(editButtons).forEach((button) => {
  button.addEventListener('click', (event) => {
    reviewText = document.getElementById(`T${button.id}`).innerHTML

    var elem = document.querySelectorAll('.modal-header h3')[1]
    elem.innerText = 'Update Your Review'
    elem = document.querySelectorAll('.modal-accept-button')[1]
    elem.innerText = 'Update'
    document.getElementById('review-text-input').value = reviewText

    var hiddenElem = document.getElementById('modal-backdrop')
    hiddenElem.classList.remove('hidden')
    hiddenElem = document.getElementById('add-review-modal')
    hiddenElem.classList.remove('hidden')

    //updating that shit
    var reviewAcceptButton = document.getElementsByClassName('modal-accept-button')[1]
    reviewAcceptButton.addEventListener('click', () => {
      var request = new XMLHttpRequest()
      request.open('PUT', 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/review-edit')
      request.setRequestHeader('Content-Type', 'application/json')


      var reviewObj = {
        review_id: button.id,
        text: document.getElementById('review-text-input').value,
        user_id: document.getElementById('review-userid-input').value,
        name: document.getElementById('review-username-input').value
      }
      requestBody = JSON.stringify(reviewObj)

      request.addEventListener('load', event => {
        if (event.target.status !== 200) {
          var message = event.target.response;
          alert("Error storing review: " + message);
        } else {
          var reviewContext = {
            name: document.getElementById('review-username-input').value,
            text: document.getElementById('review-text-input').value
          }
          var reviewHTML = Handlebars.templates.review(reviewContext)
          document.getElementsByClassName('review-container')[0].insertAdjacentHTML('afterbegin', reviewHTML)
          hideReviewModal();
          location.reload()
        }
      })
      request.send(requestBody)
    })
  })
})


// deleteing reviews
Array.from(deleteButtons).forEach((button) => {
  button.addEventListener('click', (event) => {

    var hiddenElem = document.getElementById('modal-backdrop')
    hiddenElem.classList.remove('hidden')
    hiddenElem = document.getElementById('delete-review-modal')
    hiddenElem.classList.remove('hidden')

    //updating that shit
    var reviewAcceptButton = document.getElementsByClassName('modal-accept-button')[2]
    reviewAcceptButton.addEventListener('click', () => {
      var request = new XMLHttpRequest()
      request.open('DELETE', 'https://us-west-2.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/tagflix-gprxr/service/movies/incoming_webhook/review-delete?id=' + button.id)
      request.setRequestHeader('Content-Type', 'application/json')


      var reviewObj = {
        user_id: document.getElementById('delete-userid-input').value,
        //name: document.getElementById('delete-username-input').value
      }
      requestBody = JSON.stringify(reviewObj)
      console.log(button.id)
      request.addEventListener('load', event => {
        if (event.target.status !== 200) {
          var message = event.target.response;
          alert("Error storing review: " + message);
        } else {
          var reviewContext = {
            name: document.getElementById('delete-username-input').value,
            //text: document.getElementById('delete-text-input').value
          }
          var reviewHTML = Handlebars.templates.review(reviewContext)
          document.getElementsByClassName('review-container')[0].insertAdjacentHTML('afterbegin', reviewHTML)
          hideDeleteModal();
          location.reload()

        }
      })
      request.send(requestBody)
    })
  })
})
// ----------------------------------------------------------------------------


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

function hideDeleteModal() {
  var hiddenElem = document.getElementById('modal-backdrop')
  hiddenElem.classList.add('hidden')
  hiddenElem = document.getElementById('delete-review-modal')
  hiddenElem.classList.add('hidden')
  var textInput = document.getElementById('delete-userid-input')
  textInput.value = ''
  textInput = document.getElementById('delete-username-input')
  textInput.value = ''
}
