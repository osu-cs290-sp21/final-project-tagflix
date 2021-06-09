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

  reviewAcceptButton.addEventListener('click', () => {
    var request = new XMLHttpRequest()
    request.open('POST', 'http://localhost:5000/api/v1/movies/review')
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
        hideReviewModal();
      }
    })
    request.send(requestBody)
  })
})

var tagCancelButton = document.getElementsByClassName('modal-cancel-button')[0]
var tagCloseButton = document.getElementsByClassName('modal-close-button')[0]
var tagAcceptButton = document.getElementsByClassName('modal-accept-button')[0]
tagCancelButton.addEventListener('click', hideTagModal)
tagCloseButton.addEventListener('click', hideTagModal)
tagAcceptButton.addEventListener('click', () => {
  var url = 'http://localhost:5000/api/v1/movies/tags'
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
    }
  })
  request.send(requestBody)
})


var reviewCancelButton = document.getElementsByClassName('modal-cancel-button')[1]
var reviewCloseButton = document.getElementsByClassName('modal-close-button')[1]
var reviewAcceptButton = document.getElementsByClassName('modal-accept-button')[1]
reviewCancelButton.addEventListener('click', hideReviewModal)
reviewCloseButton.addEventListener('click', hideReviewModal)


//updating the review

var editButtons = document.getElementsByClassName('update-review')
var deleteButtons = document.getElementsByClassName('delete-review')

Array.from(editButtons).forEach((button) => {
  button.addEventListener('click', (event) => {
    reviewText = document.getElementById(`T${button.id}`).innerHTML

    console.log(reviewText)
    
    var elem = document.querySelectorAll('.modal-header h3')[1]
    elem.innerText = 'Update Your Review'
    document.getElementById('review-text-input').value = reviewText

    var hiddenElem = document.getElementById('modal-backdrop')
    hiddenElem.classList.remove('hidden')
    hiddenElem = document.getElementById('add-review-modal')
    hiddenElem.classList.remove('hidden')
    
    //updating that shit
    var reviewAcceptButton = document.getElementsByClassName('modal-accept-button')[1]
    reviewAcceptButton.addEventListener('click', () => {
      var request = new XMLHttpRequest()
      request.open('PUT', 'http://localhost:5000/api/v1/movies/review')
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
        }
      })
      request.send(requestBody)
    })
  })
})



Array.from(deleteButtons).forEach((button) => {
  button.addEventListener('click', (event) => {
    reviewText = document.getElementById(`T${button.id}`).innerHTML

    console.log(reviewText)
    
    var elem = document.querySelectorAll('.modal-header h3')[1]
    

    var hiddenElem = document.getElementById('modal-backdrop')
    hiddenElem.classList.remove('hidden')
    hiddenElem = document.getElementById('add-review-modal')
    hiddenElem.classList.remove('hidden')
    
    //updating that shit
    var reviewAcceptButton = document.getElementsByClassName('modal-accept-button')[1]
    reviewAcceptButton.addEventListener('click', () => {
      var request = new XMLHttpRequest()
      request.open('DELETE', 'http://localhost:5000/api/v1/movies/review?id=' + button.id)
      request.setRequestHeader('Content-Type', 'application/json')
    
    
      var reviewObj = {
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
        }
      })
      request.send(requestBody)
    })
  })
})



/*for (var i = 0; i < editButtons.length; i++) {
  editButtons[i].addEventListener('click', (event) => {
    /* reuses add review modal. will fill in
     * text to edit, but leave username/id blank to fill in
     and validate the user input.
     //
    var elem = document.querySelectorAll('.modal-header h3')[1]
    elem.innerText = 'Update Your Review'
    elem = document.getElementById('review-text-input')
    // need to figure out which edit button user clicked to fill in text for them to edit.
    console.log(event.target.innerText);
    var hiddenElem = document.getElementById('modal-backdrop')
    hiddenElem.classList.remove('hidden')
    hiddenElem = document.getElementById('add-review-modal')
    hiddenElem.classList.remove('hidden')
  })*/

//}

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