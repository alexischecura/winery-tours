import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import Logo from '../../ui/Logo';

function Header() {
  return (
    <header className={styles.header}>
      <a href='#' className={styles.mainNavLogo}>
        <Logo />
      </a>
      <nav>
        <ul className={styles.mainNavList}>
          <li>
            <a className={styles.mainNavLink} href='#our-service'>
              Our Service
            </a>
          </li>
          <li>
            <a className={styles.mainNavLink} href='#cellars'>
              Cellars
            </a>
          </li>
          <li>
            <a className={styles.mainNavLink} href='#reviews'>
              Reviews
            </a>
          </li>
          <li>
            <a className={styles.mainNavLink} href='#cta-tours'>
              Explore all tours
            </a>
          </li>
        </ul>
      </nav>
      <ul>
        <li>
          <a>Login</a>
          <a>Sign up</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
