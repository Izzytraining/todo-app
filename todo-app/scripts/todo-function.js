"use strict";
//Checking for existing data -
///read exisiting data
const findSavedToDo = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    return todosJSON !== null ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }

  // if (todosJSON !== null) {
  //   return JSON.parse(todosJSON);
  // } else {
  //     return []
  // }
};
//console.log(localStorage.getItem("location"));
///localStorage.setItem("location", "Nottingham");

//Save todos

const saveToDos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//rendering the todos
///Render the todo
const renderToDo = (todos, filters) => {
  let filteredToDos = todos.filter(function (todo) {
    const searchTextMatch = todo.body
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    //return todo.body.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  const inCompleteToDos = filteredToDos.filter(function (todo) {
    return !todo.completed;
  });

  document.querySelector("#todoDiv").innerHTML = "";

  ///To dos message - summary
  document
    .querySelector("#todoDiv")
    .appendChild(generateMessageDOM(inCompleteToDos));

  ///filter to todos

  if (filteredToDos.length > 0) {
    filteredToDos.forEach(function (todo) {
      document.querySelector("#todoDiv").appendChild(generateToDoDOM(todo));
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add('empty-message')
    emptyMessage.textContent = "No ToDo to show";
    document.querySelector('#todoDiv').appendChild(emptyMessage);
  }

};
///////////////////////////////////////////////////


//Remove a todo from the list
const removeToDo = (id) => {
  const todosIndex = todos.findIndex(function (todo) {
    return todos.id === id;
  });

  if (todosIndex > -1) {
    todos.splice(todosIndex, 1);
  }
};

//addeventhandlercheckbox - toggle to switch between two options
const todoToggle = (id) => {
  const todo = todos.find(function (todo) {
    return todos.id === id;
  });

  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
};

//DOM for list of todos
const generateToDoDOM = (todo) => {
  const toDOEL = document.createElement("label");
  // const checkbox = document.createElement('input')
  //const textp = document.createElement("p");
  const containerEl = document.createElement('div')
  const checkbox = document.createElement("input");
  const toDOText = document.createElement("span");
  const removeButton = document.createElement("button");

  //textp.textContent = todo.body;
  //checkbox
  //  checkbox.textContent = '√'
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", function () {
    todoToggle(todos.id);
    saveToDos(todos);
    renderToDo(todos, filters);
  });

  //todo text
  toDOText.textContent = todo.body;
  containerEl.appendChild(toDOText);

  //buttonremove
  removeButton.textContent = "remove";
  removeButton.classList.add('button', 'button--text')
  toDOEL.appendChild(removeButton);
  removeButton.addEventListener("click", function () {
    console.log(todos);
    saveToDos(todos);
    removeToDo(todos.id);
    renderToDo(todos, filters);
  });


  ////setup container
  toDOEL.classList.add('list-item')
  containerEl.classList.add('list-item__container')
  toDOEL.appendChild(containerEl)

  return toDOEL;
};

//DOM for to dos message summary

const generateMessageDOM = (inCompleteToDos) => {
  const newParagraph = document.createElement("h3");
  const plural = inCompleteToDos.length === 1 ? '' : 's'
  newParagraph.classList.add('list-title')

  newParagraph.textContent = `You have ${inCompleteToDos.length} todo${plural} left`
  
  // if (newParagraph.textContent < 1) {
  //  return `You have ${inCompleteToDos.length} todo left`;
  // } else if (newParagraph.textContent > 1) {
  //  return `You have ${inCompleteToDos.length} todos left`;
  // }

  return newParagraph;
};
