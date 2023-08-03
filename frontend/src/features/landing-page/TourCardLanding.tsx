import { ITour } from '../../services/types';
import styles from './TourCardLanding.module.css';

type Props = {
  tour: ITour;
};

function TourCardLanding({
  tour: {
    name,
    duration,
    maxGroupSize,
    ratingsAverage,
    price,
    summary,
    imageCover,
    startDates,
  },
}: Props) {
  return (
    <div className={styles.card}>
      <img className={styles.cardImage} src={imageCover} alt={name} />
      <h2 className={styles.cardTitle}>{name}</h2>
      <p className={styles.cardSummary}>{summary}</p>
      <div className={styles.cardDetails}>
        <div className={styles.cardDetail}>
          <span className={styles.cardDetailLabel}>Duration:</span>
          <span>{duration} days</span>
        </div>
        <div className={styles.cardDetail}>
          <span className={styles.cardDetailLabel}>Group Size:</span>
          <span>Up to {maxGroupSize} people</span>
        </div>
        <div className={styles.cardDetail}>
          <span className={styles.cardDetailLabel}>Rating:</span>
          <span>{ratingsAverage} / 5</span>
        </div>
        <div className={styles.cardDetail}>
          <span className={styles.cardDetailLabel}>Price:</span>
          <span>${price}</span>
        </div>
      </div>
      <div className={styles.cardStartDates}>
        {startDates?.map((date) => (
          <div key={date} className={styles.startDate}>
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        ))}
      </div>
      <div>
        <ul className={styles.cardBtns}>
          <li className={`${styles.bookBtn} btn cta-btn`}>
            <a>Book Now</a>
          </li>
          <li className={`${styles.infoBtn} btn`}>
            <a>More Info</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TourCardLanding;
<p></p>;
