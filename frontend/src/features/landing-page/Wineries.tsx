import { UseQueryResult, useQuery } from '@tanstack/react-query';
import styles from './Wineries.module.css';

import SubHeading from '../../ui/SubHeading';
import Winery from './Winery';
import WineryGallery from './WineryGallery';
import { getWineries } from '../../services/apiWineries';
import { IWineriesResponse } from '../../services/types';

type WineryImageType = {
  id: string;
  alt: string;
  url: string;
};

type Props = {
  wineImages: WineryImageType[];
};

function Wineries({ wineImages }: Props) {
  const { status, error, data }: UseQueryResult<IWineriesResponse, Error> =
    useQuery<IWineriesResponse, Error>({
      queryKey: ['winery'],
      queryFn: getWineries,
    });

  console.log(status, error, data);

  return (
    <>
      <SubHeading title='wineries' />

      <div className={styles.wineries}>
        {data?.data.map((winery) => (
          <Winery winery={winery} key={winery.name} />
        ))}
      </div>
      <WineryGallery images={wineImages} />
    </>
  );
}

export default Wineries;
