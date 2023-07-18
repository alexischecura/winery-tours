import styles from './SubHeading.module.css';

type Props = {
  title: string;
};

function SubHeading({ title }: Props) {
  return <span className={styles.subHeading}>{title}</span>;
}

export default SubHeading;
