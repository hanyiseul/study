import { useReducer, useState } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter((_, i) => i !== action.payload);
    default:
      return state;
  }
}

function State() {
  const [text, setText] = useState('');
  const [list, dispatch] = useReducer(reducer, []);

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button
        onClick={() => {
          if (!text.trim()) return;
          dispatch({ type: 'ADD', payload: text });
          setText('');
        }}
      >
        추가
      </button>

      {list.map((item, i) => (
        <div key={i}>
          <span>{item}</span>
          <button onClick={() => dispatch({ type: 'REMOVE', payload: i })}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}

export default State;