function TodoForm(props) {
  return (
    <div style={styles.formBox}>
      <input
        type="text"
        value={props.text}
        onChange={function (e) {
          props.setText(e.target.value);
        }}
        placeholder="할 일을 입력하세요"
        style={styles.input}
      />
      <button onClick={props.addTodo} style={styles.button}>
        추가
      </button>
    </div>
  );
}

const styles = {
  formBox: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  button: {
    padding: '10px 14px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#222',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default TodoForm;