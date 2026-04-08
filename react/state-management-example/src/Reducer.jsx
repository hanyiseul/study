import { useReducer } from 'react';

function reducerHandler(state, action) {
  switch (action.type) {
    case 'INCREASE':
      return { count: state.count + 1 };
    case 'DECREASE':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

function Reducer() {
  const [state, dispatch] = useReducer(reducerHandler, { count: 0 });

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: 'INCREASE' })}>증가</button>
      <button onClick={() => dispatch({ type: 'DECREASE' })}>감소</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>초기화</button>
    </div>
  );
}

export default Reducer;