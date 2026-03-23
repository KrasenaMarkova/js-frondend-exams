let host = 'http://localhost:3030/jsonstore/reservations';

// <button id="add-reservation">Add Reservation</button>
let addBtn = document.getElementById('add-reservation');
// <button id="edit-reservation" disabled>Edit Reservation</button>
let editBtn = document.getElementById('edit-reservation');

//<button id="load-history">Load Reservations</button>
document.getElementById('load-history').addEventListener('click', showReservations);
addBtn.addEventListener('click', onAdd);
editBtn.addEventListener('click', onEdit);

async function showReservations() {
    let data = await getAllReservations();

    let list = document.getElementById('list');
    list.replaceChildren();
    
    for (let record of data) {
        let changeBtn = create('button', ['Change']);
        changeBtn.addEventListener('click', () => onRecordEdit(record, element));
        changeBtn.className = 'change-btn';

        let deleteBtn = create('button', ['Done']);
        deleteBtn.addEventListener('click', async () => {
            await deleteReservations(record._id);
            showReservations();
        });
        deleteBtn.className = 'delete-btn';

        // <div class="container">
        //     <h2>Kaloyan Petrov</h2>
        //     <h3>2025-08-01</h3>
        //     <h3 id="reservation_days">8</h3>
        //     <div class="buttons-container">
        //       <button class="change-btn">Change</button>
        //       <button class="delete-btn">Delete</button>
        //     </div>
        // </div>

        let controlDiv = create('div', [
            changeBtn,
            deleteBtn
        ], 'buttons-container');

        let element = create('div', [
            create('h2', [record.names]),
            create('h3', [record.date]),
            create('h3', [record.days], 'reservation_days'),
            controlDiv
        ]);

        element.className = 'container';
        list.appendChild(element);
    }
}

function onRecordEdit(record, element) {
    element.remove();

    document.getElementById('names').value = record.names;
    document.getElementById('days').value = record.days;
    document.getElementById('date').value = record.date;

    editBtn.dataset.id = record._id;

    addBtn.disabled = true;
    editBtn.disabled = false;
}

async function onAdd() {
    let namesInput = document.getElementById('names');
    let daysInput = document.getElementById('days');
    let dateInput = document.getElementById('date');

    if (!namesInput.value || !daysInput.value || !dateInput.value) {
        return;
    }

    await addReservation(namesInput.value, daysInput.value, dateInput.value);

    namesInput.value = '';
    daysInput.value = '';
    dateInput.value = '';

    addBtn.disabled = false;
    editBtn.disabled = true;
    editBtn.dataset.id = '';

    showReservations();
}

async function onEdit() {
    let namesInput = document.getElementById('names');
    let daysInput = document.getElementById('days');
    let dateInput = document.getElementById('date');
    let id = editBtn.dataset.id;

    if (!namesInput.value || !daysInput.value || !dateInput.value) {
        return;
    }

    await updateReservation(id, namesInput.value, daysInput.value, dateInput.value);

    namesInput.value = '';
    daysInput.value = '';
    dateInput.value = '';

    showReservations();
}

async function addReservation(names, days, date) {
    let record = {
        names,
        days,
        date
    };

    let options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    };

    await fetch(host, options);
}

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

async function updateReservation(_id, names, days, date) {
    let record = {
        _id,
        names,
        days,
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
