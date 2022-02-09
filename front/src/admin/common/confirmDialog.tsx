import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

interface IConfirmDialog {
    isOpen: boolean,
    onClose: (isConfirmed?: boolean) => void
}
const ConfirmDialog: React.FC<IConfirmDialog> = (props) => {
    const handleClose = (isConfirmed?: boolean) => {
        props.onClose(isConfirmed)
    }
    return (
        <Dialog
            open={props.isOpen}
            onClose={() => handleClose()}
        >
            <DialogTitle>Подтверждение</DialogTitle>
            <DialogContent>
                <DialogContentText >
                    Удалить товар из списка?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} color="primary" >
                    Отмена
                </Button>
                <Button onClick={() => handleClose(true)} color="primary" autoFocus>
                    Удалить
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default ConfirmDialog