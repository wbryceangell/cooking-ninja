import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Searchbar.css";

type Props = {};

const Searchbar: React.FC<Props> = ({}) => {
  const [term, setTerm] = useState("");
  const history = useHistory();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    history.push(`/search?term=${term}`);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </form>
    </div>
  );
};

export default Searchbar;
