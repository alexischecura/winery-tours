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
            <a className={styles.mainNavLink} href='#wineries'>
              Wineries
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
      <ul className={styles.btnList}>
        <li>
          <a className={`${styles.btnHeader} btn`}>Login</a>
        </li>
        <li className={`${styles.btnHeader} btn cta-btn`}>
          <a>Sign Up</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
