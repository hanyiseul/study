import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav style={{ background: '#eee', padding: '10px' }}>
      <Link to="/">Home</Link> |
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navigation;