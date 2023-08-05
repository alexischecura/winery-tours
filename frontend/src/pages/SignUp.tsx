import styles from './Login.module.css';
import SignUpForm from '../features/authentication/SignUpForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

function SignUp() {
  return (
    <main className={styles.loginForm}>
      <Logo />
      <Heading type='h3'>Create a new account</Heading>
      <SignUpForm />
    </main>
  );
}

export default SignUp;
