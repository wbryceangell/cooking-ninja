import { Link } from "react-router-dom";
import "./Navbar.css";

interface Props {}

const Navbar: React.FC<Props> = ({}) => {
  return (
    <div className="navbar">
      <nav>
        <Link className="brand" to="/">
          <h1>Cookings ninjas</h1>
        </Link>
        <Link to="/create">Create recipe</Link>
      </nav>
    </div>
  );
};

export default Navbar;
