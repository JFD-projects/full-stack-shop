import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import store from '../store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCommonDispatch } from '../hooks/useCommonDispatch';
import ConfirmDialog from '../admin/common/confirmDialog';
import { removeFavoriteProduct } from '../features/favoriteSlice';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { addCartProduct, removeProduct } from '../features/cartSlice';
import { IProduct } from '../models/IProduct';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
        button: {
            margin: theme.spacing(1),
        },
        textField: {
            '& .MuiInput-input': {
                textAlign: 'center'
            }
        },
    }),
);
interface IFavoriteCart { }
const FavoriteCart: React.FC<IFavoriteCart> = () => {
    const classes = useStyles();
    const productStore = store.getState().favorite

    const [productById, setProductById] = React.useState<IProduct[]>([])
    const getProductById: any = async () => {
        const response = await axios.post(`http://localhost:3300/api/product/getMany`, productStore)
        return response.data
    }
    React.useEffect(() => {
        if (productStore) {
            (async () => {
                const product = await getProductById()
                setProductById(product)
            })()
        }
    }, [productStore, getProductById])

    const dispatch = useCommonDispatch();
    const [dialogIsOpen, setDialog] = React.useState(false)
    const [productIdToDelete, setProductIdToDelete] = React.useState('')
    const handleDel = (productId: string) => {
        setProductIdToDelete(productId)
        setDialog(true)
    }
    const handleDialogClose = (isConfirmed?: boolean) => {
        if (isConfirmed) {
            dispatch(removeFavoriteProduct(productIdToDelete))
        }
        setProductIdToDelete('')
        setDialog(false)
    }


    // const hanleAdd = (id: string) => {
    //     dispatch(addCartProduct(id))
    // }
    const productStoreCart = store.getState().cart
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


    if (productById.length === 0) {
        return <>
            Вы пока ничего не добавили в Избранное
        </>
    }
    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell align="center">Цена</TableCell>
                        <TableCell align="center">Купить</TableCell>
                        <TableCell align="center">Удалить</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productById?.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell component="th" scope="row">
                                {product.name}
                            </TableCell>
                            <TableCell align="center">{product.price}{product.currency}</TableCell>

                            <TableCell align="center">
                                <IconButton
                                    onClick={() => hanleAdd(product.id)}
                                >
                                    <AddShoppingCartIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center"><IconButton
                                color="secondary"
                                onClick={() => handleDel(product.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <ConfirmDialog isOpen={dialogIsOpen} onClose={handleDialogClose} />
    </>;
};

export default FavoriteCart;