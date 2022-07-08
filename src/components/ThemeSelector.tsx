import { ThemeColors } from "../constants/ThemeColors";
import { useTheme } from "../hooks/useTheme";
import modeIcon from "../assets/mode-icon.svg";
import "./ThemeSelector.css";
import { ThemeModes } from "../constants/ThemeModes";

type Props = {};

const ThemeSelector: React.FC<Props> = ({}) => {
  const { dispatch, mode } = useTheme();
  const changeColor = (color: ThemeColors) => {
    dispatch && dispatch({ type: "CHANGE_COLOR", payload: color });
  };
  const toggleMode = () => {
    dispatch && dispatch({ type: "TOGGLE_MODE" });
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          alt="dark/light toggle icon"
          onClick={toggleMode}
          style={{
            filter: mode === ThemeModes.Dark ? "invert(100%)" : "invert(20%)",
          }}
        />
      </div>
      <div className="theme-buttons">
        {Object.values(ThemeColors).map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
