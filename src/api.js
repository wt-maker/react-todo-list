const todos = [
  {
    id: 1,
    text: 'todo1',
    finished: true
  },
  {
    id: 2,
    text: 'todo2',
    finished: false
  },
  {
    id: 3,
    text: 'todo3',
    finished: true
  },
  {
    id: 4,
    text: 'todo4',
    finished: false
  },
  {
    id: 5,
    text: 'todo5',
    finished: true
  },
]

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const withDelay = fn => async (args) => {
  await delay(1000);
  return fn(args);
};

export const fetchTodos = withDelay(params => {
  const { query, tab } = params;
  let result = todos;

  if (tab) {
    switch (tab) {
      case "finished":
        result = result.filter(todo => todo.finished===true);
        break;
      case "unfinished":
        result = result.filter(todo => todo.finished === false);
        break;
      default:
        break;
    }
  }

  if (query) {
    result = result.filter(todo => todo.text.includes(query));
  }

  return Promise.resolve({
    tab,
    result
  });
});

export const addTodo = withDelay(todo => {
  todos.push(todo);
  return Promise.resolve(true);
});

export const toggleTodo = withDelay(id => {
  const todoIndex = todos.findIndex(({id: todoId}) => todoId === id);

  if (todoIndex !== -1) {
    const todo = todos[todoIndex];
    const newTodo = {
      ...todo,
      finished: !todo.finished
    };
    todos.splice(todoIndex, 1, newTodo)
  }
  return Promise.resolve(true);
})