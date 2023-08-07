import styles from './SpinnerMini.module.css';
import { BiLoaderAlt } from 'react-icons/bi';

interface Props {
  color?: 'white' | 'black' | 'wine' | 'golden';
}

function SpinnerMini({ color = 'wine' }: Props) {
  return (
    <BiLoaderAlt
      className={`${styles.spinnerMini} ${styles[color]}`}
    ></BiLoaderAlt>
  );
}

export default SpinnerMini;
