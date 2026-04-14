import { useAtom } from 'jotai';
import { themeAtom } from './atoms/themeAtom';
import { tabAtom } from './atoms/uiAtom';

import Header from './components/Header';
import UserProfile from './components/UserProfile';
import FilterPanel from './components/FilterPanel';
import ProductList from './components/ProductList';
import Modal from './components/Modal';
import Tabs from './components/Tabs';

function App() {
  const [theme] = useAtom(themeAtom);
  const [tab] = useAtom(tabAtom);

  return (
    <div className={theme === 'light' ? 'app light' : 'app dark'}>
      <Header />
      <Tabs />

      {tab === '상품목록' ? (
        <>
          <FilterPanel />
          <ProductList />
        </>
      ) : (
        <UserProfile />
      )}

      <Modal />
    </div>
  );
}

export default App;