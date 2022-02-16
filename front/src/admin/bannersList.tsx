import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Banner from './banners';
import NavBar from './common/navBar';
import NewBanner from './newBanner';
interface IBannersList {

}
const BannersList: React.FC<IBannersList> = () => {

    return <>
        <NavBar />
        <Routes>
            <Route path="/" element={<Navigate to='banners' />} />
            <Route path="banners" element={<Banner />} />
            <Route path="new/" element={<NewBanner />} />
        </Routes>
    </>
}
export default BannersList