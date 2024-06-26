// Define a class for managing a todo list
class TodoList {
  constructor() {
    this.items = [];
  }

  // Add an item to the list
  addItem(item) {
    this.items.push(item);
  }

  // Remove an item from the list
  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  // Render the list to HTML
  render() {
    const listElement = document.getElementById('todo-list');
    listElement.innerHTML = ''; // Clear existing list

    this.items.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. ${item}`;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        this.removeItem(index);
        this.render();
      });

      listItem.appendChild(deleteButton);
      listElement.appendChild(listItem);
    });
  }
}

// Create an instance of TodoList
const todoList = new TodoList();

// Function to add new item from input
function addItemFromInput() {
  const inputElement = document.getElementById('new-item-input');
  const value = inputElement.value.trim();

  if (value !== '') {
    todoList.addItem(value);
    todoList.render();
    inputElement.value = ''; // Clear input
  }
}

// Initialize the app
function initializeApp() {
  const addButton = document.getElementById('add-button');
  addButton.addEventListener('click', addItemFromInput);

  // Initial rendering
  todoList.render();
}

// Run the app after DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
