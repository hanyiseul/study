import { useAtom } from 'jotai';
import { countAtom } from '../atoms/counterAtom';

function CountButtons() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div className="button-group">
      <button onClick={function () {
        setCount(count + 1);
      }}>
        증가
      </button>

      <button onClick={function () {
        setCount(count - 1);
      }}>
        감소
      </button>

      <button onClick={function () {
        setCount(0);
      }}>
        초기화
      </button>
    </div>
  );
}

export default CountButtons;