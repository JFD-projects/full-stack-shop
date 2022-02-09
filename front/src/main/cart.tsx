import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import store from '../store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { useCommonDispatch } from '../hooks/useCommonDispatch';
import { removeProduct, addCartProduct, decrimentProductCount } from '../features/cartSlice';
import ConfirmDialog from '../admin/common/confirmDialog';
import axios from 'axios';
import { IProduct } from '../models/IProduct';

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
interface ICart { }
const Cart: React.FC<ICart> = () => {
    const classes = useStyles();
    const productStore = store.getState().cart

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
    }, [productStore])


    const dispatch = useCommonDispatch();
    const [dialogIsOpen, setDialog] = React.useState(false)
    const [productIdToDelete, setProductIdToDelete] = React.useState('')
    // const productById = productStore.products.filter((p) => {
    //     return productStore.cart.includes(p.id)
    // })

    const handleDel = (productId: string) => {
        setProductIdToDelete(productId)
        setDialog(true)
    }
    const handleDialogClose = (isConfirmed?: boolean) => {
        if (isConfirmed) {
            dispatch(removeProduct(productIdToDelete))
        }
        setProductIdToDelete('')
        setDialog(false)
    }

    const getCount = (id: string) => {
        return productStore.reduce((acc, curId) => {
            if (id === curId) {
                return acc + 1
            } else { return acc }
        }, 0)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const newValue = +event.target.value
        if (newValue > getCount(id)) {
            dispatch(addCartProduct(id))
        } else {
            dispatch(decrimentProductCount(id))
        }
    }

    if (productById.length === 0) {
        return <>
            Корзина пустая
        </>
    }
    return <>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell align="center">Цена</TableCell>
                        <TableCell align="center">Количество</TableCell>
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
                                <TextField
                                    className={classes.textField}
                                    type="number"
                                    defaultValue={getCount(product.id) || 0}
                                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                                    onChange={
                                        (event:
                                            React.ChangeEvent<HTMLInputElement>) => handleChange(event, product.id)
                                    }
                                />
                            </TableCell>
                            <TableCell align="center"><IconButton
                                color="secondary"
                                onClick={() => handleDel(product.id)}
                            >
                                <DeleteIcon />
                            </IconButton></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <ConfirmDialog isOpen={dialogIsOpen} onClose={handleDialogClose} />
    </>;
};

export default Cart;