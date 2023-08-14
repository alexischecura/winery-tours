import styles from './WineryLanding.module.css';

import {
  GiMeal,
  GiSpookyHouse,
  GiVineLeaf,
  GiWineBottle,
} from 'react-icons/gi';
import { Winery } from '../../types/types';

type Props = { winery: Winery };

function WineryLanding({ winery }: Props) {
  return (
    <div className={styles.winery}>
      <div className={styles.wineryText}>
        <h3 className={`${styles.wineryHeading} heading-tertiary`}>
          {winery.name}
        </h3>
        <ul className={styles.wineryList}>
          <li className={styles.wineryListItem}>
            <GiVineLeaf />
            <span>Vineyars</span>
          </li>
          <li className={styles.wineryListItem}>
            <GiSpookyHouse />
            <span>Winery</span>
          </li>
          <li className={styles.wineryListItem}>
            <GiMeal />
            <span>Restaurant</span>
          </li>
          <li className={styles.wineryListItem}>
            <GiWineBottle />
            <span>Wine Tasting</span>
          </li>
        </ul>
        <a className={`${styles.btn} btn`}>See more about this winery</a>
      </div>
      <img
        className={styles.wineryImg}
        src={winery.imageCover}
        alt="gray winery among tall trees"
      />
    </div>
  );
}

export default WineryLanding;
