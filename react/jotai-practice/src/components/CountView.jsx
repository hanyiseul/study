import { useAtom } from 'jotai';
import { countAtom } from '../atoms/counterAtom';

function CountView() {
  const [count] = useAtom(countAtom);

  return (
    <div className="count-view-box">
      <h2>현재 카운트</h2>
      <p className="count-number">{count}</p>
    </div>
  );
}

export default CountView;