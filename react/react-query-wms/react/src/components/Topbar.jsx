function Topbar({ searchKeyword, setSearchKeyword }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button type="button" className="menu-toggle-button">
          ☰
        </button>

        <div className="topbar-search-box">
          <input
            type="text"
            placeholder="Search"
            value={searchKeyword}
            onChange={function (event) {
              setSearchKeyword(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-circle"></div>
        <div className="topbar-avatar">●</div>
      </div>
    </header>
  );
}

export default Topbar;