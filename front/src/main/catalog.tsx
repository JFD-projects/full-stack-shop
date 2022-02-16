import axios from 'axios';
import React, { useState } from 'react';
import { IProduct } from '../models/IProduct';
import Product from './product';
import SwipeableTextMobileStepper from './slider';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IBannerModel } from '../models/IBanner';
import Image from './imageList';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        product: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
    }),
);

interface ICatalog { }
const Catalog: React.FC<ICatalog> = () => {
    const classes = useStyles();

    const [products, setProducts] = React.useState<IProduct[]>([])
    const [banners, setBanners] = useState<IBannerModel[]>([])
    const getProducts: any = async () => {
        const response = await axios.get('http://localhost:3300/api/product/getAll')
        return response.data
    }
    const getBanners: any = async () => {
        const response = await axios.get('http://localhost:3300/api/banner/getAll')
        return response.data
    }
    React.useEffect(() => {
        (async () => {
            const productsDB = await getProducts()
            setProducts(productsDB)
            const bannersDB = await getBanners()
            setBanners(bannersDB)
        })()
    }, [])

    return (
        <>
            <div className='container-fluid d-flex flex-column p-5'>
                <div className='container-fluid d-flex '>
                    <SwipeableTextMobileStepper />
                    <Image banner={banners} />
                </div>
                <div className={classes.product}>
                    {products?.map((product) =>
                        <Product key={product.id} {...product} />
                    )}
                </div >
            </div>
        </>
    )
};

export default Catalog;