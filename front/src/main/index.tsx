import * as React from 'react';
import { Route, Routes } from 'react-router';
import Cart from './cart';
import Catalog from './catalog';
import NavBar from './common/navBar';
import FavoritePage from './favoritePage';
import ProductPage from './productPage';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserPage from './userPage';
import Footer from './common/footer';
import Contacts from './contactsPage';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100vh'
        },
        content: {
            // height: '100vh'
            // height: 'calc(100% - 40px)'
        }
    }),
);

interface IMain {

}

const Main: React.FC<IMain> = () => {
    const classes = useStyles();

    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return <div className={classes.root}>
            <CircularProgress color="secondary" />
        </div>
    }
    return <>
        <div className={classes.root}>
            <NavBar />
            <div className={`container-fluid ${classes.content} `}>
                <Routes>
                    <Route path="/*" element={<Catalog />} />
                    <Route path="product/:id" element={<ProductPage />} />
                    <Route path="favorite/" element={<FavoritePage />} />
                    <Route path="cart/" element={<Cart />} />
                    <Route path="userPage/" element={<UserPage />} />
                    <Route path='contactsPage' element={<Contacts />} />
                </Routes>
            </div>
            <Footer />
        </div>
    </>
}
export default Main