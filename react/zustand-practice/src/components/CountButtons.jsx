import useCounterStore from '../store/counterStore';

function CountButtons() {
  const increase = useCounterStore(function (state) {
    return state.increase;
  });

  const decrease = useCounterStore(function (state) {
    return state.decrease;
  });

  const reset = useCounterStore(function (state) {
    return state.reset;
  });

  return (
    <div className="button-group">
      <button onClick={increase}>증가</button>
      <button onClick={decrease}>감소</button>
      <button onClick={reset}>초기화</button>
    </div>
  );
}

export default CountButtons;