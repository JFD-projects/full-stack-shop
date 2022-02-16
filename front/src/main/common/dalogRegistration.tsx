import React, { useState } from 'react';
import { Dialog, DialogTitle, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import { IUser } from '../../models/IUser';
import axios from 'axios';
import { setToLocalStorage } from '../../services/localStorage';
import { useCommonDispatch } from '../../hooks/useCommonDispatch';
import { setUser } from '../../features/userSlice';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

interface IDialogRegisration {
    isOpen: boolean,
    onClose: (isConfirmed?: boolean) => void,
}
const DialogRegisration: React.FC<IDialogRegisration> = (props) => {
    const [login, setLogin] = useState(false)
    const openDialogAuth = () => {
        setLogin(!login)
    }
    const dispatch = useCommonDispatch()
    const handleClose = (isConfirmed?: boolean) => {
        props.onClose(isConfirmed)
    }
    const { control, handleSubmit, reset } = useForm({
        defaultValues:
        {
            email: '',
            password: '',
            name: ''
            // image: '/images/defaultImage.png'
        }
    });
    const onSubmit = async (data: IUser) => {
        if (login) {
            const response = await axios.post('http://localhost:3300/api/user/login', data);
            setToLocalStorage(response.data.token, 'token')
            dispatch(setUser(response.data.token))
        } else {
            const response = await axios.post('http://localhost:3300/api/user/registration', data);
            setToLocalStorage(response.data.token, 'token')
            dispatch(setUser(response.data.token))
        }
        setLogin(false)
        handleClose()
    }

    const classes = useStyles();

    return (
        <Dialog
            open={props.isOpen}
            onClose={() => handleClose()}
        >
            <DialogTitle>{login ? 'Вход' : 'Регистрация'} </DialogTitle>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
            >
                <div className={classes.root}>
                    {!login &&
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => <TextField label="Введите Ваше имя" type="text"  {...field} />}
                        />
                    }
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <TextField label="Введите ваш email" type="text"  {...field} />}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <TextField label="Введите ваш пароль" type="text"  {...field} />}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    type='submit'
                >
                    {login ? 'Войти' : 'Регистрация'}
                </Button>
            </form>
            <Button
                onClick={openDialogAuth}
            >
                {login ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже зарегисстрированы? Вход'}

            </Button>
        </Dialog>
    );
}
export default DialogRegisration