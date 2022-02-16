import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

interface IConfirmDialog {
    isOpen: boolean,
    onClose: (isConfirmed?: boolean) => void,
    info: string
}
const ConfirmDialog: React.FC<IConfirmDialog> = (props) => {
    const handleClose = (isConfirmed?: boolean) => {
        props.onClose(isConfirmed)
    }
    const info = props.info

    return (
        <Dialog
            open={props.isOpen}
            onClose={() => handleClose()}
        >
            <DialogTitle>Описание</DialogTitle>
            <DialogContent>
                <DialogContentText >
                    {info}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} color="primary" >
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default ConfirmDialog