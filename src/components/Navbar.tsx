import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import "./Navbar.css";
import Searchbar from "./Searchbar";

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
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
