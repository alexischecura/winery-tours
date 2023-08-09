import VerificationForm from '../features/authentication/VerificationForm';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';
import styles from './Form.module.css';

function Verification() {
  return (
    <main className={styles.form}>
      <Logo />
      <Heading type='h3'>Verify your account</Heading>
      <VerificationForm />
    </main>
  );
}

export default Verification;
