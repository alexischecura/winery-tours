import { UseQueryResult, useQuery } from '@tanstack/react-query';
import styles from './WineriesLanding.module.css';

import SubHeading from '../../ui/SubHeading';
import Winery from './WineryLanding';
import WineryGallery from './WineryGallery';
import { getWineries } from '../../services/apiWineries';
import { WineriesResponse } from '../../types/types';

type WineryImageType = {
  id: string;
  alt: string;
  url: string;
};

type Props = {
  wineImages: WineryImageType[];
};

function WineriesLanding({ wineImages }: Props) {
  const { data }: UseQueryResult<WineriesResponse, Error> = useQuery<
    WineriesResponse,
    Error
  >({
    queryKey: ['winery'],
    queryFn: getWineries,
  });

  return (
    <>
      <SubHeading title="wineries" />

      <div className={styles.wineries}>
        {data?.data.map((winery) => (
          <Winery winery={winery} key={winery.name} />
        ))}
      </div>
      <WineryGallery images={wineImages} />
    </>
  );
}

export default WineriesLanding;
