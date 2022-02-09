import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import NavBar from './common/navBar';
import List from './list';
import New from './new';
interface ICatalog {

}
const Catalog: React.FC<ICatalog> = () => {

    return <>
        <NavBar />
        <Routes>
            <Route path="/" element={<Navigate to='list' />} />
            <Route path="list" element={<List />} />
            <Route path="new/" element={<New />} />
            <Route path="new/:id" element={<New />} />
        </Routes>
    </>
}
export default Catalog