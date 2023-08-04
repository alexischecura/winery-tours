import { FormEvent, useState } from 'react';
import styles from './LoginForm.module.css';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import { useLogin } from './useLogin';

function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loginApi, isLoading } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    loginApi(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormRow label='Email address' childrenId='email'>
        <input
          className={styles.input}
          type='email'
          id='email'
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label='Password' childrenId='password'>
        <input
          className={styles.input}
          type='password'
          id='password'
          autoComplete='username'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <Button type='primary' disabled={isLoading}>
        Log In
      </Button>
    </form>
  );
}

export default LoginForm;
