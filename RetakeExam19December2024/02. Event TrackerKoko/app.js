window.addEventListener("load", solve);

function solve(){
    // id = save
    document.getElementById('save').addEventListener('click', onSave);
    // class delete
    document.querySelector('.delete').addEventListener('click', onDelete);

    function onSave(ev) {
        ev.preventDefault();

        // да прочетем какво има в input полетата
        let event = document.getElementById('event').value;
        let note = document.getElementById('note').value;
        let date = document.getElementById('date').value;

        // да ги валидираме
        if (!event || !note || !date) {
            return;
        }

        // create DOM elements  and append them to the list / ако е валидно елемента да се премести в upcoming
        //  <li class="event-item">
        //       <div class="event-container">
        //         <article>
        //         <p>Name: IMAGINE DRAGONS</p>
        //           <p>Note: Vasil Levski National Stadium, Sofia</p>
        //           <p>Date: 2023-07-30</p>
        //       </article>
        //         <div class="buttons">
        //           <button class="btn edit">Edit</button>
        //           <button class="btn done">Done</button>
        //         </div>
        //       </div>
        //     </li>

        let editBtn = create('button', ['Edit'], 'btn edit');
        editBtn.addEventListener('click', () => onEdit(event, note, date, element));

        let doneBtn = create('button', ['Done'], 'btn done');
        doneBtn.addEventListener('click', () => onDone(element));

        let element = create('li', [
            create('div', [
                create('article', [
                    create('p', [`Name: ${event}`]),
                    create('p', [`Note: ${note}`]),
                    create('p', [`Date: ${date}`])
                ]),
                create('div', [
                    editBtn,
                    doneBtn
                ], 'buttons')
            ], 'event-container')
        ], 'event-item');

        let list = document.getElementById('upcoming-list');
        list.appendChild(element);

        // и да изчистим формуляра
        document.querySelector('form').reset();
    }

    function onEdit(event, note, date, element) {
        document.getElementById('event').value = event;
        document.getElementById('note').value = note;
        document.getElementById('date').value = date;

        element.remove();
    }

    function onDone(element) {
    //    <ul id="events-list">
    //      <!-- <li class="event-item">
    //           <article>
    //         <p>Name: IMAGINE DRAGONS</p>
    //           <p>Note: Sofia - National Stadium</p>
    //           <p>Date: 2023-07-30</p>
    //          </article>
    //      </li> -->
    //    </ul>

        // запаметяваме си article
        let article = element.querySelector('article');

         // изтриваме съдържанието
        element.replaceChildren();

        element.appendChild(article);

        // добавяме element на новото място
        let list = document.getElementById('events-list');
        list.appendChild(element);
    }

    function onDelete() {
        document.getElementById('events-list').replaceChildren();
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

// function solve() {
//     let eventInput = document.getElementById('event');
//     let noteInput = document.getElementById('note');
//     let dateInput = document.getElementById('date');
//     let saveBtn = document.getElementById('save');

//     let upcomingList = document.getElementById('upcoming-list');
//     let endedList = document.getElementById('events-list');
//     let deleteBtn = document.querySelector('.btn.delete');

//     saveBtn.addEventListener('click', () => {
//         let name = eventInput.value.trim();
//         let note = noteInput.value.trim();
//         let date = dateInput.value.trim();

//         if (!name || !note || !date) return;

//         let li = document.createElement('li');
//         li.className = 'event-item';

//         let container = document.createElement('div');
//         container.className = 'event-container';

//         let article = document.createElement('article');
//         article.innerHTML = `
//             <p>Name: ${name}</p>
//             <p>Note: ${note}</p>
//             <p>Date: ${date}</p>
//         `;

//         let btnDiv = document.createElement('div');
//         btnDiv.className = 'buttons';

//         let editBtn = document.createElement('button');
//         editBtn.className = 'btn edit';
//         editBtn.textContent = 'Edit';

//         let doneBtn = document.createElement('button');
//         doneBtn.className = 'btn done';
//         doneBtn.textContent = 'Done';

//         btnDiv.appendChild(editBtn);
//         btnDiv.appendChild(doneBtn);

//         container.appendChild(article);
//         container.appendChild(btnDiv);
//         li.appendChild(container);
//         upcomingList.appendChild(li);

//         eventInput.value = '';
//         noteInput.value = '';
//         dateInput.value = '';

//         editBtn.addEventListener('click', () => {
//             eventInput.value = name;
//             noteInput.value = note;
//             dateInput.value = date;
//             li.remove();
//         });

//         doneBtn.addEventListener('click', () => {
//             li.querySelector('.buttons').remove();
//             endedList.appendChild(li);
//         });
//     });

//     deleteBtn.addEventListener('click', () => {
//         endedList.innerHTML = '';
//     });
// }
