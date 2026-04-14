import useCounterStore from '../store/counterStore';

function CountView() {
  const count = useCounterStore(function (state) {
    return state.count;
  });

  return (
    <div className="count-view-box">
      <h2>현재 카운트</h2>
      <p className="count-number">{count}</p>
    </div>
  );
}

export default CountView;