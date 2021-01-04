import React, {useState} from 'react';
// import axios from 'axios';
// import useAsync from '../useAsync';
// import { useAsync } from 'react-async';
import { useUserState, useUsersDispatch, getUsers } from '../UsersContext';
import User from './User';


function Users(){
    const [userId, setUserId] = useState(null);
    const state = useUserState();
    const dispatch = useUsersDispatch();

    const { data: users, loading, error } = state.users;
    const fetchData = () =>{
        getUsers(dispatch);
    };
    
    // const [state, refetch] = useAsync(getUser, [], true);
    // const {loading, data: users, error} = state;

    

    if (loading) 
        return <div>로딩중...</div>;
    if (error) 
        return <div>에러가 발생했습니다</div>;
    if (!users) {
        return <button onClick={fetchData}>불러오기</button>;
    }
    return (
        <>
            <ul>
                {users.map(user => (
                    <li className={user.id === userId ? 'red' : ''} key={user.id}
                        onClick={() => setUserId(user.id)}
                        style={{cursor:'pointer'}}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={() =>{setUserId(null); fetchData()}}>다시 불러오깅</button>
            {userId && <User id={userId}/>}
        </>
    );
}
export default Users;