(function () {
  const todoArrObj = [];

  // Создаём и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // Создаём и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    const newIdInput = 'input-id';
    input.id = newIdInput;
    const newIdBtn = 'submit';
    button.id = newIdBtn;

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    let formTask = input;
    let addNewTaskBtn = button;
    addNewTaskBtn.disabled = true;

    function disabledBtn() {
      if(formTask.value.length > 0) {
        addNewTaskBtn.disabled = false;
      }
    }

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);
    // button.disabled = true;

    input.addEventListener('input', (e) => {
      e.preventDefault();
    });

    return {
      form,
      input,
      button,
    };
  }

  // btnPush.setAttribute('disabled', true);

  // Создаём и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(name) {
    let item = document.createElement('li');
    // Кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // Устанавливаем стили для элемента сиписка, а так же для размещения кнопок
    // в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    // Вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // Приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }


  function createTodoApp(container, title = 'Список дел', arrayCases) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    // Браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела и создает его
    todoItemForm.form.addEventListener('submit', (e) => {
      // Эта строчка необходима, чтобы предотвратить стандартное действие браузера
      // В данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
      e.preventDefault();

      let newTodo = {
        // todoItemForm.input.value - это текстовое значение при собитии submit записывается в ключе name
        name: todoItemForm.input.value,
        done: false,
        id: undefined,
      };
      todoArrObj.push(newTodo);

      // Игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      console.log(todoArrObj);
      let todoItem = createTodoItem(todoItemForm.input.value);

      // Добавляем обработчики на кнопку
      todoItem.doneButton.addEventListener('click', () => {
        // если активируем класс выполнения дела, то меняем значение объекта done на true
        if (todoItem.item.classList.toggle('list-group-item-success')) {
          newTodo.done = true;
          console.log(newTodo);
        } else {
          newTodo.done = false;
          console.log(newTodo);
        }
      });
      todoItem.deleteButton.addEventListener('click', () => {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
        }
      });

      // Создаём и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItem.item);
      // Обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = '';
    });
  }

  window.createTodoApp = createTodoApp;
}());
