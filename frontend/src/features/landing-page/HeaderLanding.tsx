import styles from './HeaderLanding.module.css';
import Logo from '../../ui/Logo';
import { Link } from 'react-router-dom';

function HeaderLanding() {
  return (
    <header className={styles.header}>
      <a href="#" className={styles.mainNavLogo}>
        <Logo />
      </a>
      <nav>
        <ul className={styles.mainNavList}>
          <li>
            <a className={styles.mainNavLink} href="#our-service">
              Our Service
            </a>
          </li>
          <li>
            <a className={styles.mainNavLink} href="#wineries">
              Wineries
            </a>
          </li>
          <li>
            <a className={styles.mainNavLink} href="#reviews">
              Reviews
            </a>
          </li>
          <li>
            <a className={styles.mainNavLink} href="#cta-tours">
              Explore all tours
            </a>
          </li>
        </ul>
      </nav>
      <ul className={styles.btnList}>
        <li className={`${styles.btnHeader} btn`}>
          <Link to="/login" className={styles.btn}>
            Login
          </Link>
        </li>
        <li className={`${styles.btnHeader} btn cta-btn`}>
          <Link to="/signup" className={styles.btn}>
            Sign Up
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default HeaderLanding;
