import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { IToursResponse } from '../../services/types';
import { getTours } from '../../services/apiTours';
import styles from './Tours.module.css';
import TourCard from './TourCard';
import SubHeading from '../../ui/SubHeading';

function Tours() {
  const { status, error, data }: UseQueryResult<IToursResponse, Error> =
    useQuery<IToursResponse, Error>({
      queryKey: ['tours'],
      queryFn: getTours,
    });
  return (
    <section className={styles.tours}>
      <SubHeading title='tours' />
      <div className={styles.tourCards}>
        {data?.data.map((tour) => (
          <TourCard tour={tour} key={tour.id} />
        ))}
      </div>
    </section>
  );
}

export default Tours;
