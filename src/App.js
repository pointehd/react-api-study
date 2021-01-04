import Users from './components/Users'
import React from 'react';
import { UserProvider } from './UsersContext'
function App() {
  return (
    <UserProvider>
      <Users/>
    </UserProvider>
  );
}

export default App;
