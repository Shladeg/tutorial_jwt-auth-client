import React, { FC, useContext, useState } from 'react';
import { Context } from '..';

const LoginForm: FC = () => {
  const {store} = useContext(Context)

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return <div>
    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

    <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />

    <button onClick={() => store.login(email, password)}>Войти</button>
    
    <button onClick={() => store.registration (email, password)}>Зарегистрироваться</button>
  </div>
};

export default LoginForm;