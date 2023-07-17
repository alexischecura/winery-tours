import styles from './Cellar.module.css';
import CellarImg from '../../assets/cellar-1.jpg';
import { GiSpookyHouse, GiVineLeaf, GiWineBottle } from 'react-icons/gi';

type Props = {
  cellar: object;
};

function Cellar({ cellar }: Props) {
  return (
    <div className={`${styles.cellar} container`}>
      <div className={styles.cellarText}>
        <h3 className='heading-tertiary'>Best Cellars</h3>
        <ul className={styles.cellarList}>
          <li className={styles.cellarListItem}>
            <GiVineLeaf />
            <span>Vineyars</span>
          </li>
          <li className={styles.cellarListItem}>
            <GiSpookyHouse />
            <span>Wineries</span>
          </li>
          <li className={styles.cellarListItem}>
            <GiWineBottle />
            <span>Wines</span>
          </li>
        </ul>
        <a className={styles.btn}>Explore All Cellars</a>
      </div>
      <img
        className={styles.cellarImg}
        src={CellarImg}
        alt='gray cellar among tall trees'
      />
    </div>
  );
}

export default Cellar;
