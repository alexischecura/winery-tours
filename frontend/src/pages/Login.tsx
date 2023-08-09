import styles from './Form.module.css';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

function Login() {
  return (
    <main className={styles.form}>
      <Logo />
      <Heading type='h3'>Login in your account</Heading>
      <LoginForm />
    </main>
  );
}

export default Login;
