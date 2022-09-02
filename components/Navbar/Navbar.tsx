import styles from "./Navbar.module.scss";
import { useRouter } from "next/router";
import { BsMoon, BsMoonFill } from "react-icons/bs";
import { actionTypes } from "../../utilits/types";
interface props {
  darkMode: boolean;
  setDarkMode: Function;
}

function Navbar(props: props) {
  const { darkMode, setDarkMode } = props;
  const router = useRouter();
  console.log(darkMode);

  return (
    <nav className={styles.Navbar}>
      <ul>
        <li onClick={() => router.push("/")}>Where in the world ?</li>
        <li onClick={() => setDarkMode((prev: boolean) => !prev)}>
          <span>{darkMode ? <BsMoonFill /> : <BsMoon />}</span>Dark mode
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
