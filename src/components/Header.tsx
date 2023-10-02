import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={`${styles.header} container`}>
      <h1>UpTrader</h1>
      <nav className={styles.navbar}>
        <ul className={styles.navbar_list}>
          <li className={styles.navbar_item}>
            <Link to={"/"}>Projects</Link>
          </li>
          <li className={styles.navbar_item}>
            <Link to={"/list"}>Tasks</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
