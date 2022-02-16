import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import store from '../store';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useCommonDispatch } from '../hooks/useCommonDispatch';
import { addCartProduct, removeProduct } from '../features/cartSlice';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addFavoriteProduct, removeFavoriteProduct } from '../features/favoriteSlice';
import axios from 'axios';
import { IProduct } from '../models/IProduct';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            paddingLeft: '5rem',
            paddingTop: '2rem'
        },
        content: {
            display: 'flex',
            paddingRight: '5rem'
        },
        leftBlock: {
            marginRight: '2rem'
        },
        image: {
            width: '350px',
            height: '250px'
        },
        rightBlock: {

        },
        price: {

        },
        imageMini: {
            width: '150px',
            height: '100px'
        },
        action: {
            display: 'flex',
            backgroundColor: '#cee1f1'
        },
        Active: {
            marginLeft: '1rem',
            fontSize: '40px',
            color: 'red'
        },
        button: {
            transform: ' translateY(40px)',
            marginLeft: '2rem'
        },
        AddShoppingCartIcon: {
            marginLeft: '1rem',
            fontSize: '40px'
        }
    }),
);
interface IProductPage { }

const ProductPage: React.FC<IProductPage> = () => {
    const productStore = store.getState().favorite
    const productStoreCart = store.getState().cart

    const { id } = useParams()
    const dispatch = useCommonDispatch()
    const classes = useStyles();
    const [isAddedCart, setAdded] = useState(false)
    const hanleAdd = (id: string) => {
        if (productStoreCart.includes(id)) {
            dispatch(removeProduct(id))
        }
        else {
            dispatch(addCartProduct(id))
        }
        setAdded(!isAddedCart)
    }


    const [isFavorite, setFaforite] = useState(false)

    const hanleFavoriteAdd = (id: string) => {
        if (productStore.includes(id)) {
            dispatch(removeFavoriteProduct(id))
        }
        else {
            dispatch(addFavoriteProduct(id))
        }
        setFaforite(!isFavorite)
    }
    const [productById, setProductById] = React.useState<IProduct>()
    React.useEffect(() => {
        const getProductById: any = async () => {
            if (id) {
                const response = await axios.get(`http://localhost:3300/api/product/getOne`, { params: { id } })
                return response.data
            }

        }
        (async () => {
            const product = await getProductById()
            setProductById(product)
        })()
    }, [id])

    return (
        <div className={classes.root}>
            <div>
                <h1>
                    {productById?.name}
                </h1>
            </div>
            <div className={classes.content}>
                <div className={classes.leftBlock} >
                    <img src={productById?.image} alt='' className={classes.image} />
                </div>
                <div className={classes.rightBlock}>
                    <div>
                        {productById?.description}
                    </div>
                    <hr />
                    <div className={classes.action}>
                        <div className={classes.price}>
                            {productById?.price}{productById?.currency} <br />
                            <img src={productById?.image} alt='' className={classes.imageMini} /><br />
                            {productById?.amount} шт. в магазине
                        </div>
                        {productById ?
                            <div className={classes.button}>
                                <IconButton
                                    onClick={() => hanleAdd(productById?.id)}
                                >
                                    Купить <AddShoppingCartIcon className={isAddedCart ? classes.Active : classes.AddShoppingCartIcon} />
                                </IconButton>
                                <IconButton
                                    aria-label="add to favorites"
                                    onClick={() => hanleFavoriteAdd(productById?.id)}
                                >
                                    Добавить в избранное
                                    <FavoriteIcon className={isFavorite ? classes.Active : classes.AddShoppingCartIcon} />
                                </IconButton>
                            </div> :
                            <h1>Loading...</h1>
                        }

                    </div>
                    <hr />
                    <div>
                        {productById?.fullDescription}
                    </div>
                </div>

            </div>


        </div>
    )
};

export default ProductPage;