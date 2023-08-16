import { Link } from 'react-router-dom';
import { useUser } from '../authentication/useUser';
import styles from './HeaderDashboard.module.css';

function HeaderDashboard() {
  const { data } = useUser();

  return (
    <div className={styles.header}>
      THIS IS THE DASHBOARD {data?.data.user.fullName}
      <Link to="/">Go to landing</Link>
    </div>
  );
}

export default HeaderDashboard;
