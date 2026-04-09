import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useTodos from './useTodos';

function App() {
  const [text, setText] = useState('');

  const { 
    todos, 
    addTodo, 
    toggleTodo, 
    removeTodo 
  } = useTodos();

  // 완료되지 않은 할 일 개수 계산
  const remainCount = todos.filter(function (todo) {
    return todo.done === false;
  }).length;

  return (
    <div style={styles.wrap}>
      <h1 style={styles.title}>Todo List</h1>
      <p style={styles.desc}>남은 할 일: {remainCount}개</p>

      <TodoForm
        text={text}
        setText={setText}
        addTodo={function () {
          addTodo(text);
          setText('');
        }}
      />

      <TodoList 
        todos={todos} 
        toggleTodo={toggleTodo} 
        removeTodo={removeTodo} 
      />
    </div>
  );
}

const styles = {
  wrap: {
    width: '500px',
    margin: '40px auto',
    padding: '24px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    backgroundColor: '#fafafa',
  },
  title: {
    marginBottom: '10px',
  },
  desc: {
    marginBottom: '20px',
    color: '#555',
  },
};

export default App;