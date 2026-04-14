import { useAtom } from 'jotai';
import { tabAtom, modalAtom } from '../atoms/uiAtom';

function Tabs() {
  const [tab, setTab] = useAtom(tabAtom);
  const [, setModalOpen] = useAtom(modalAtom);

  return (
    <section className="card">
      <h2>UI 상태 관리</h2>

      <div className="tab-row">
        <button
          className={tab === '상품목록' ? 'active-tab' : ''}
          onClick={function () {
            setTab('상품목록');
          }}
        >
          상품목록
        </button>

        <button
          className={tab === '사용자정보' ? 'active-tab' : ''}
          onClick={function () {
            setTab('사용자정보');
          }}
        >
          사용자정보
        </button>

        <button
          onClick={function () {
            setModalOpen(true);
          }}
        >
          모달 열기
        </button>
      </div>

      <p>현재 활성 탭: {tab}</p>
    </section>
  );
}

export default Tabs;