import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import IUser from './models/IUser';
import UserService from './services/UserService';

const App: FC = observer(() => {
  const {store} = useContext(Context);

  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const response = await UserService.fetchUsers();

      setUsers(response.data)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (store.isLoading) {
    return <h1>Загрузка...</h1>
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>{`Пользователь авторизован ${store.user.email}`}</h1>

      <button onClick={store.logout}>Выйти</button>

      <button onClick={fetchUsers}>Получить пользователей</button>

      {isLoading ? <>Загрузка...</> :<div>
        {users.map(u => <h3 key={u.id}>{u.email}</h3>)}
      </div>}
    </div>

  )
})

export default App;
