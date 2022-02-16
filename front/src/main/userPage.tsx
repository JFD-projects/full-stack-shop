import React from 'react';
import { IUser } from '../models/IUser';
import store from '../store';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from "react-hook-form";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { setToLocalStorage } from '../services/localStorage';
import { useCommonDispatch } from '../hooks/useCommonDispatch';
import axios from 'axios';
import { setUser } from '../features/userSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '30%',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));
interface IUserPage { }

const UserPage: React.FC<IUserPage> = () => {
    const classes = useStyles();
    const dispatch = useCommonDispatch()

    const [userById, setUserById] = React.useState<IUser | null>(store.getState().user)
    const { control, handleSubmit, reset } = useForm({
        defaultValues:
            userById ? userById : {
                name: '',
                email: '',
                // image: '/images/defaultImage.png'
            }
    });
    const onSubmit = async (data: IUser) => {
        const response = await axios.put('http://localhost:3300/api/user/edit', data);
        setToLocalStorage(response.data.token, 'token')
        dispatch(setUser(response.data.token))
    }

    React.useEffect(() => {
        if (userById) {
            reset(userById)
        }
    }, [userById, reset])
    React.useEffect(() => {
        setUserById(store.getState().user)
    }, [])

    return <>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.root}
            noValidate
            autoComplete="off"
        >
            <div className='d-flex flex-column'>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <TextField label="Имя" type="text"  {...field} />}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField label="Email" type="text"  {...field} />}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                type='submit'
            >
                Сохранить
            </Button>
        </form>
    </>
};

export default UserPage;