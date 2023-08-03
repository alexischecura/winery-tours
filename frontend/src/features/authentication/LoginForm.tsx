import { useState } from 'react';
import styles from './LoginForm.module.css';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';

function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <form className={styles.form}>
      <FormRow label='Email address' childrenId='email'>
        <input
          className={styles.input}
          type='email'
          id='email'
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        />
      </FormRow>
      <Button type='primary'>Login</Button>
    </form>
  );
}

export default LoginForm;
