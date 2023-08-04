import styles from './Button.module.css';

type Props = {
  type: 'primary' | 'secondary';
  disabled?: boolean;
  children: React.ReactNode;
};

function Button({ type, disabled = false, children }: Props) {
  return (
    <button disabled={disabled} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
