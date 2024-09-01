import BookmarksIcon from "@mui/icons-material/Bookmarks";
import "./styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-icon">
        <BookmarksIcon />
      </div>
      <div className="header-content">
        <h1 className="header-title">Bookmark Manager</h1>
        {/* <p className="header-caption">Organize your favorite links with ease</p> */}
      </div>
    </header>
  );
};

export default Header;
