import { Link } from "react-router-dom";
import "./Navbar.css";
import Searchbar from "./Searchbar";

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  return (
    <div className="navbar">
      <nav>
        <Link className="brand" to="/">
          <h1>Cooking Ninja</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create recipe</Link>
      </nav>
    </div>
  );
};

export default Navbar;
