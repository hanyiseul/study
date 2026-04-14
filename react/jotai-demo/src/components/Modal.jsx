import { useAtom } from 'jotai';
import { modalAtom } from '../atoms/uiAtom';

function Modal() {
  const [isOpen, setIsOpen] = useAtom(modalAtom);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>모달 창</h2>
        <p>이 모달의 열림 상태도 Jotai atom으로 제어한다.</p>
        <button onClick={function () {
          setIsOpen(false);
        }}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default Modal;