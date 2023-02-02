"use strict";
////

const todos = findSavedToDo();

const filters = {
  searchText: "",
  hideCompleted: false,
};

//to grab each todo object and then create and element as text content and then query select it to the body
//and then append child
renderToDo(todos, filters);

///Form listener

document.querySelector("#todo-form").addEventListener("submit", function (e) {
  const text = e.target.elements.newToDO.value.trim()
  e.preventDefault();

if (text.length > 0) {
  todos.push({
    id: uuidv4(),
    body: text,
    completed: false,
  });

  saveToDos(todos);

  console.log(e.target.elements.newToDO.value);
  e.target.elements.newToDO.value = "";
  renderToDo(todos, filters);
}


 
});

///search text
document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchText = e.target.value;
  renderToDo(todos, filters);
  console.log(e.target.value);
});

//CHECKBOX
document
  .querySelector("#hide-completed")
  .addEventListener("change", function (e) {
    filters.hideCompleted = e.target.checked;
    console.log(e.target.checked);
    renderToDo(todos, filters);
  });

renderToDo(todos, filters);
