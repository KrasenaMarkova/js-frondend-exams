window.addEventListener("load", solve);

function solve() {
    // parse form
    // - prevent form submission
  
    // - clear and disable form

    // return for editing
    // - recover input data
    // - populate and enable form
    // - remove DOM element

    // apply event
    // - copy valyes to new DOM element and add it to list
    // - remove original element

  // add event listener to form
  let submitBtn = document.getElementById('next-btn');
  submitBtn.addEventListener('click', onSubmit);

  function onSubmit(ev) {
    ev.preventDefault();

    // - read and validate input values
    let email = document.getElementById('email').value;
    let event = document.getElementById('event').value;
    let location = document.getElementById('location').value;

    if (!email || !event || !location) {
      return;
    }

    // - configure event listeners
    let result = create('li', [
        create('article', [
            create('h4', [email]),
            create('p', [
                create('strong', ['Event:']),
                create('br', []),
                event
            ]),
            create('p', [
                create('strong', ['Location:']),
                create('br', []),
                location
            ]),
        ]),
    ]);

    let editBtn = create('button', ['edit']);
    editBtn.className = 'action-btn edit';
    editBtn.addEventListener('click', () => onEdit(email, event, location));
    result.appendChild(editBtn);

    let applyBtn = create('button', ['apply']);
    applyBtn.className = 'action-btn apply';
    applyBtn.addEventListener('click', () => onApply(result));
    result.appendChild(applyBtn);

    result.className = 'application';

    let list = document.getElementById('preview-list');
    list.appendChild(result);

    document.querySelector('.registerEvent').reset();

    // включваме бутона
    submitBtn.disabled = true;
  }

  function onEdit(email, event, location) {
      document.getElementById('email').value = email;
      document.getElementById('event').value = event;
      document.getElementById('location').value = location;

      // изключваме бутона
      submitBtn.disabled = false;

      // изтриваме елемента
      //document.getElementById('preview-list').innerHTML = '';
      document.getElementById('preview-list').replaceChildren();
  }

  function onApply(element) {
    document.getElementById('event-list').appendChild(element);
    let btns = Array.from(element.querySelectorAll('button'));

    for (let btn of btns) {
      btn.remove();
    }

    submitBtn.disabled = false;

  }

  function create(tagName, content) {
    // - create DOM element and add to list
      let element = document.createElement(tagName);
   
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
}