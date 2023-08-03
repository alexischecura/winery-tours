import styles from './Button.module.css';

type Props = {
  type: 'primary' | 'secondary';
  children: React.ReactNode;
};

function Button({ type, children }: Props) {
  return (
    <button className={`${styles.btn} ${styles[type]}`}>{children}</button>
  );
}

export default Button;
