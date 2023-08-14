import styles from './Form.module.css';
import SignUpForm from '../features/authentication/SignUpForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

function SignUp() {
  return (
    <main className={styles.form}>
      <Logo />
      <Heading type="h3">Create a new account</Heading>
      <SignUpForm />
    </main>
  );
}

export default SignUp;
