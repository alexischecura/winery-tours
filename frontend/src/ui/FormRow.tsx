import styles from './FormRow.module.css';

type Props = {
  label?: string;
  error?: string;
  children: React.ReactNode;
  childrenId: string;
};

function FormRow({ label, error, children, childrenId }: Props) {
  return (
    <div className={styles.formRow}>
      {label && (
        <label className={styles.label} htmlFor={childrenId}>
          {label}
        </label>
      )}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormRow;
