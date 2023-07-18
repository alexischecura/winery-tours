import styles from './Winery.module.css';
import WineryImg from '../../assets/winery-1.jpg';

import {
  GiMeal,
  GiSpookyHouse,
  GiVineLeaf,
  GiWineBottle,
} from 'react-icons/gi';

type Props = {
  winery: {
    name: string;
  };
};

function Cellar({ winery }: Props) {
  return (
    <div className={styles.cellar}>
      <div className={styles.cellarText}>
        <h3 className={`${styles.cellarHeading} heading-tertiary`}>
          {winery.name}
        </h3>
        <ul className={styles.cellarList}>
          <li className={styles.cellarListItem}>
            <GiVineLeaf />
            <span>Vineyars</span>
          </li>
          <li className={styles.cellarListItem}>
            <GiSpookyHouse />
            <span>Cellar</span>
          </li>
          <li className={styles.cellarListItem}>
            <GiMeal />
            <span>Restaurant</span>
          </li>
          <li className={styles.cellarListItem}>
            <GiWineBottle />
            <span>Wine Tasting</span>
          </li>
        </ul>
        <a className={styles.btn}>See more about this cellar</a>
      </div>
      <img
        className={styles.cellarImg}
        src={WineryImg}
        alt='gray cellar among tall trees'
      />
    </div>
  );
}

export default Cellar;
