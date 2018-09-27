
document.addEventListener('DOMContentLoaded', init);
let form = document.querySelector('#new-chore-form');
form.addEventListener('submit', handleSubmit);

function init(){
  fetchChores();
};

function fetchChores(){
  fetch('http://localhost:3000/chores')
    .then(resp => resp.json())
    .then(resp => resp.forEach(function(chore){
      createChoreCard(chore);
    }))
};


function createChoreCard(chore){
  let choreCard = `<div class="chore-card">
  <button class="delete-button" data-id=${chore.id}>x</button>
  <h3> "${chore.title}" </h3>
  <p> Duration: "${chore.duration}" </p>
  <input value= "${chore.priority}">
  </div>`

  const choreList = document.querySelector('#chore-list');
  choreList.addEventListener('click', handleDeleteClick);
  choreList.innerHTML += choreCard;

};

function handleSubmit(event){
  event.preventDefault();

  let inputTitle = event.target.title;
  let inputPriority = event.target.priority;
  let inputDuration = event.target.duration;
  let data = {
    title: inputTitle.value,
    priority: inputPriority.value,
    duration: inputDuration.value
  }
  postChore(data)
    .then(resp => createChoreCard(resp))

    inputTitle.value = '';
    inputPriority.value = '';
    inputDuration.value = '';
}

function postChore(data){
  return fetch('http://localhost:3000/chores', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(resp => resp.json())
};

function handleDeleteClick(event){
  if (event.target.className === 'delete-button'){
    let id = event.target.dataset.id;
    let div = event.target.parentElement;
    div.remove();
    deleteChore(id);
  }
}

function deleteChore(id){
  fetch(`http://localhost:3000/chores/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type' : 'application/json'
    },
  })
  .then(resp => resp.json())
  .then(resp => console.log(resp))
}
