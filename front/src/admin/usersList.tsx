import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import NavBar from './common/navBar';
import NewUser from './newUser';
// import New from './new';
import Users from './users';
interface IUsersList {

}
const UsersList: React.FC<IUsersList> = () => {

    return <>
        <NavBar />
        <Routes>
            <Route path="/" element={<Navigate to='users' />} />
            <Route path="users" element={<Users />} />
            <Route path="new/" element={<NewUser />} />
        </Routes>
    </>
}
export default UsersList