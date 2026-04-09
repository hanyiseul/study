import useLocalStorage from './useTodos';

function useTodos() {
  const [todos, setTodos] = useLocalStorage('todo_data', []);

  // 할 일 추가
  function addTodo(text) {
    if (text.trim() === '') {
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: text,
      done: false,
    };

    setTodos([...todos, newTodo]);
  }

  // 완료 상태 토글
  function toggleTodo(id) {
    const newTodos = todos.map(function (todo) {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });

    setTodos(newTodos);
  }

  // 할 일 삭제
  function removeTodo(id) {
    const newTodos = todos.filter(function (todo) {
      return todo.id !== id;
    });

    setTodos(newTodos);
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
}

export default useTodos;