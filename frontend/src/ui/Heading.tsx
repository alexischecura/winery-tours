import styles from './Heading.module.css';

type Props = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
};

function Heading({ type, children }: Props) {
  const HeadingTag = type || 'h1';

  return (
    <HeadingTag className={`${styles.heading} ${styles[type]}`}>
      {children}
    </HeadingTag>
  );
}

export default Heading;
