import styles from "./Navbar.module.scss";
import { useRouter } from "next/router";
import { BsMoon, BsMoonFill } from "react-icons/bs";
interface props {
  darkMode: boolean;
  setDarkMode: Function;
}

function Navbar(props: props) {
  const { darkMode, setDarkMode } = props;

  return (
    <nav className={styles.Navbar}>
      <div className={styles["Navbar__content"]}>
        <h1>Where in the world ?</h1>
        <ul>
          <li onClick={() => setDarkMode((prev: boolean) => !prev)}>
            <span>{darkMode ? <BsMoonFill /> : <BsMoon />}</span>Dark mode
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
