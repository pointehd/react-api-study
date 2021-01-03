import React, {useState} from 'react';
import axios from 'axios';
// import useAsync from '../useAsync';
import { useAsync } from 'react-async';
import User from './User';

async function getUser(){
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
}

function Users(){
    const [userId, setUserId] = useState(null);
    const {data: users, error, isLoading, run } = useAsync({
        deferFn: getUser
    });
    
    // const [state, refetch] = useAsync(getUser, [], true);
    // const {loading, data: users, error} = state;

    

    if (isLoading) 
        return <div>로딩중...</div>;
    if (error) 
        return <div>에러가 발생했습니다</div>;
    if (!users) {
        return <button onClick={run}>불러오기</button>;
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
            <button onClick={() =>{setUserId(null); run()}}>다시 불러오깅</button>
            {userId && <User id={userId}/>}
        </>
    );
}
export default Users;