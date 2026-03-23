let host = 'http://localhost:3030/jsonstore/workout';

let addBtn = document.getElementById('add-workout');
let editBtn = document.getElementById('edit-workout');

document.getElementById('load-workout').addEventListener('click', showWorkouts);
addBtn.addEventListener('click', onAdd);
editBtn.addEventListener('click', onEdit);

async function showWorkouts() {
    let data = await getAllReservations();

    let list = document.getElementById('list');
    list.replaceChildren();

    for (let record of data) {
        // създаваме бутоните
        let changeBtn = create('button', ['Change']);
        changeBtn.addEventListener('click', () => onRecordEdit(record, element));
        changeBtn.className = 'change-btn';

        let deleteBtn = create('button', ['Done']);
        deleteBtn.addEventListener('click', async () => {
            await deleteReservations(record._id);
            showWorkouts();
        });
        deleteBtn.className = 'delete-btn';

        // вкарваме бутоните в контролниния div
        let controlDiv = create('div', [
            changeBtn,
            deleteBtn
        ], 'buttons-container');

        // създаваме елемента и слагаме съдържанието на workout и контролният div
        let element = create('div', [
            create('h2', [record.workout]),
            create('h3', [record.date]),
            create('h3', [record.location], 'location'),
            controlDiv
        ]);

        // слагаме класа на готовия елемент
        element.className = 'container';

        // закачаме елемента към списъка
        list.appendChild(element);
    }
}

function onRecordEdit(record, element) {
    element.remove();

    document.getElementById('workout').value = record.workout;
    document.getElementById('location').value = record.location;
    document.getElementById('date').value = record.date;

    editBtn.dataset.id = record._id;

    addBtn.disabled = true;
    editBtn.disabled = false;
}

async function onAdd() {
    let workoutInput = document.getElementById('workout');
    let locationInput = document.getElementById('location');
    let dateInput = document.getElementById('date');
    
    if (!workoutInput.value || !locationInput.value || !dateInput.value) {
        return;
    }

    await addWorkout(workoutInput.value, locationInput.value, dateInput.value);

    workoutInput.value = '';
    locationInput.value = '';
    dateInput.value = '';

    addBtn.disabled = false;
    editBtn.disabled = true;
    editBtn.dataset.id = '';

    showWorkouts();
}

async function onEdit() {
    let workoutInput = document.getElementById('workout');
    let locationInput = document.getElementById('location');
    let dateInput = document.getElementById('date');
    let id = editBtn.dataset.id;
    
    if (!workoutInput.value || !locationInput.value || !dateInput.value) {
        return;
    }

    await updateReservation(id, workoutInput.value, locationInput.value, dateInput.value);

    workoutInput.value = '';
    locationInput.value = '';
    dateInput.value = '';

    showWorkouts();
    
}

// първо пишем всички функции, които са getAllOrders, createOrder, updateOrder, deleteOrder
async function getAllReservations() {
    let res = await fetch(host);

    if (res.status == 204) {
        return[];
    }

    let data = await res.json();
    return Object.values(data);
}



async function deleteReservations(id) {
    let options = {
        method: 'delete'
    };
    
    await fetch(`${host}/${id}`, options);
}

async function updateReservation(_id, workout, location, date) {
    let record = {
        _id,
        workout,
        location,
        date
    };

    let options = {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    };

    await fetch(`${host}/${_id}`, options);
}

function create(tagName, content, id) {
    // - create DOM element and add to list
      let element = document.createElement(tagName);

      if (id) {
        element.id = id;
      }
   
      for (let child of content) {
          if (typeof child == 'object') {
            element.appendChild(child);
          } else {
              let node = document.createTextNode(child);
              element.appendChild(node);
          }
      }
      return element;
}