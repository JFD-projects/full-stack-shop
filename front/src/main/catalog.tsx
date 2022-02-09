import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IProduct } from '../models/IProduct';
import store from '../store';
import TitlebarImageList from './imageList';
import Product from './product';
import SwipeableTextMobileStepper from './slider';

interface ICatalog { }
const Catalog: React.FC<ICatalog> = () => {

    const [products, setProducts] = React.useState<IProduct[]>([])
    const getProducts: any = async () => {
        const response = await axios.get('http://localhost:3300/api/product/getAll')
        return response.data
    }
    React.useEffect(() => {
        (async () => {
            const productsDB = await getProducts()
            setProducts(productsDB)
        })()
    }, [])

    return (
        <>
            <div className='container-fluid d-flex flex-column p-5'>
                {/* <div className='container-fluid d-flex '>
                    <SwipeableTextMobileStepper />
                    <TitlebarImageList />
                </div> */}
                <div className='d-flex'>
                    {products?.map((product) =>
                        <Product key={product.id} {...product} />
                    )}
                </div >
            </div>
        </>
    )
};

export default Catalog;