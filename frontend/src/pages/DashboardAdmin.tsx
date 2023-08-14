import HeaderDashboard from '../features/dashboard/HeaderDashboard';
import styles from './DashboardAdmin.module.css';

function DashboardAdmin() {
  return (
    <div className={styles.dashboard}>
      <HeaderDashboard />
    </div>
  );
}

export default DashboardAdmin;
