import Navbar from "./Navbar/Navbar";
import styles from "../styles/index.module.scss";
import { ContextProvider } from "../context/context";
import { useState } from "react";

interface props {
  children: JSX.Element;
}

function Layout(props: props) {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ContextProvider>
      <div className={darkMode ? styles.dark : styles.light}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        {props.children}
      </div>
    </ContextProvider>
  );
}

export default Layout;
