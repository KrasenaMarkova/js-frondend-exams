// добавяме линка без / на края
let host = 'http://localhost:3030/jsonstore/orders';

document.getElementById('load-orders').addEventListener('click', loadOrders);

let createBtn = document.getElementById('order-btn');
createBtn.addEventListener('click', onCreate);

let editBtn = document.getElementById('edit-order');
editBtn.addEventListener('click', onEdit);


async function loadOrders() {
    // взимаме всички ордъри
    let data = await getAllOrders();

    // <div id="list">
    //      <!-- <div class="container">
    //           <h2>Glasses</h2>
    //            <h3>2023-06-09</h3>
    //            <h3>100</h3>
    //            <button class="change-btn">Change</button>
    //            <button class="done-btn">Done</button>
    //        </div> -->
    //  </div>
    let list = document.getElementById('list');
    // изпразваме листа
    list.replaceChildren();

    for (let entry of data) {
        let element = create ('div', [
            create('h2', [entry.name]),
            create('h3', [entry.date]),
            create('h3', [entry.quantity]),
            create('button', ['Change'], 'change-btn', () => editClick(entry, element)),
            create('button', ['Done'], 'done-btn', () => onDelete(entry._id)),
        ], 'container');

        // добавяме го в списъка
        list.appendChild(element);
    }
    
}

async function onCreate(ev) {
    ev.preventDefault();

    let name = document.getElementById('name').value;
    let quantity = document.getElementById('quantity').value;
    let date = document.getElementById('date').value;

    await createOrder(name, quantity, date);

    // изпразваме формуляра
    document.querySelector('form').reset();

    loadOrders();
}

async function onEdit(ev) {
    ev.preventDefault();

    let name = document.getElementById('name').value;
    let quantity = document.getElementById('quantity').value;
    let date = document.getElementById('date').value;
    let _id = editBtn.dataset.id;
   
    await updateOrder(_id, name, quantity, date);

    createBtn.disabled = false;
    editBtn.disabled = true;

    // изпразваме формуляра
    document.querySelector('form').reset();

    loadOrders();
}

function editClick(entry, element) {
    document.getElementById('name').value = entry.name;
    document.getElementById('quantity').value = entry.quantity;
    document.getElementById('date').value = entry.date;
    editBtn.dataset.id = entry._id;

    element.remove();

    createBtn.disabled = true;
    editBtn.disabled = false;
}

async function onDelete(id) {
    await deleteOrder(id);

    loadOrders();
}


// първо пишем всички функции, които са getAllOrders, createOrder, updateOrder, deleteOrder
async function  getAllOrders() {
    let res = await fetch(host);

    if (res.status == 204) {
        return [];
    }

    let data = await res.json();

    return Object.values(data);
}

async function createOrder(name, quantity, date) {
    // като в нета видим че getAllOrders работи от там виждаме както да има в entry
    let entry = {
        name,
        quantity,
        date
    };

    let options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
    };

    await fetch(host, options);
}

async function updateOrder(_id, name, quantity, date)  {
    // копираме кода от createOrder, като добавяме _id
    let entry = {
        _id,
        name,
        quantity,
        date
    };

    let options = {
        // променяме  method: 'put',
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
    };

    // променяме в скобите като добавяме `${host}/${_id}`
    await fetch(`${host}/${_id}`, options);
}

async function deleteOrder(id) {
    await fetch(`${host}/${id}`, { method: 'delete' });
}

// тази функция я копираме от втората задача за създаваме на елементи
// като сме добавили и още един параметър callback
function create(tagName, content = [], className, callback) {
    let element = document.createElement(tagName);

    for (let item of content) {

        if (typeof item != 'object') {
            item = document.createTextNode(item);
        }
            
        element.appendChild(item);
    }

    if (className) {
        element.className = className;
    }

    if (typeof callback == 'function') {
        element.addEventListener('click', callback);
    }

    return element;
}