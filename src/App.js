import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from './component/UserCards';
import { setUsers } from './redux/userSlice';


const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.userList);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      dispatch(setUsers(data));
    };

    fetchUsers();
  }, [dispatch]);

  console.log("users",users);
  

  return (
    <div className="app">
      <h1>User Profiles</h1>
      <div className="user-list">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default App;
