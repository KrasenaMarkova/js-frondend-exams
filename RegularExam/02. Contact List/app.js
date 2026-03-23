window.addEventListener("load", solve);

function solve() {
    //id="add_btn"
    document.getElementById('add_btn').addEventListener('click', onAdd);

    function onAdd(ev) {
        ev.preventDefault();

        // <input type="text" id="first_name" placeholder="First name" />
        // <input type="text" id="last_name" placeholder="Last name" />
        // <input type="text" id="phone" placeholder="Phone" />

        let firstName = document.getElementById('first_name').value;
        let lastName = document.getElementById('last_name').value;
        let phone = document.getElementById('phone').value;

        if (!firstName || !lastName || !phone) {
            return;
        }

        // <!-- <li class="contact">
        //           <span class="names">Stanislav Dimitrov</span>
        //           <span class="phone_number">0887553358</span>
        //           <button class="edit_btn">Edit</button>
        //           <button class="verify_btn">Verify</button>
        // </li> -->

        let editBtn = create('button', ['Edit'], 'edit_btn');
        editBtn.addEventListener('click', () => onEdit(firstName, lastName, phone, element));

        let verifyBtn = create('button', ['Verify'], 'verify_btn');
        verifyBtn.addEventListener('click', () => onVerify(element));

        let element = create('li', [
            create('span', [`${firstName} ${lastName}`], 'names'),
            create('span', [`${phone}`], 'phone_number'),
            editBtn,
            verifyBtn
        ], 'contact');

        // the information from the input fields must be added to the <ul> with the 
        // id "pending_contact_list"
        let list = document.getElementById('pending_contact_list');
        list.appendChild(element);

        // the input fields should be cleared.
        document.querySelector('form').reset();
    }

    function onEdit(firstName, lastName, phone, element) {
        document.getElementById('first_name').value = firstName;
        document.getElementById('last_name').value = lastName;
        document.getElementById('phone').value = phone;

        element.remove();
    }

    function onVerify(element) {
        // When you click the [Verify] button, the record must be deleted from the <ul> with 
        // id "pending_contact_list" and appended to the <ul> with id "contact_list".

        let buttons = element.querySelectorAll('button');
        buttons.forEach(btn => btn.remove());

        // <ul id="contact_list">
        //   <!-- <li class="verified_contact">
        //     <span class="names">Stanislav Dimitrov</span>
        //     <span class="phone_number">0887553358</span>
        //     <button class="delete_btn">Delete</button>
        //   </li> -->
        // </ul>
        
        let deleteBtn = create('button', ['Delete'], 'delete_btn');
        deleteBtn.addEventListener('click', () => onDelete(element));
        element.appendChild(deleteBtn);

        element.className = 'verified_contact';

        document.getElementById('contact_list').appendChild(element);
    }

    function onDelete() {
        document.getElementById('contact_list').replaceChildren();
    }

    function create(tagName, content = [], className) {
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

        return element;
    }
}
