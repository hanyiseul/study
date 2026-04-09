function TodoList(props) {
  return (
    <div>
      {props.todos.map(function (todo) {
        return (
          <div key={todo.id} style={styles.item}>
            <div style={styles.leftBox}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={function () {
                  props.toggleTodo(todo.id);
                }}
              />

              <span
                style={{
                  ...styles.text,
                  textDecoration: todo.done ? 'line-through' : 'none',
                  color: todo.done ? '#999' : '#222'
                }}
              >
                {todo.title}
              </span>
            </div>

            <button
              onClick={function () {
                props.removeTodo(todo.id);
              }}
              style={styles.deleteButton}
            >
              삭제
            </button>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #eee'
  },
  leftBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  text: {
    fontSize: '16px'
  },
  deleteButton: {
    padding: '6px 10px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#d93025',
    color: '#fff',
    cursor: 'pointer'
  }
};

export default TodoList;