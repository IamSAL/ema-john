import React, { useState, useRef, useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SnackbarMsg = ({ openSnack, LoginErrorMsg, SnackSeverity, setOpenSnack, autohide }) => {
    let ref = useRef();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    return (
        <Snackbar ref={ref} open={openSnack} autoHideDuration={autohide} onClose={handleClose}>
            <Alert onClose={handleClose} severity={SnackSeverity}>
                {LoginErrorMsg}
            </Alert>
        </Snackbar>
    )
}

function Alert(props) {
    const SnackRef = useRef()
    return <MuiAlert ref={SnackRef} elevation={8} variant="filled" {...props} />;
}
export function ShowNotification({ msg, severity = "info", autohide = 5000 }) {
    const [openSnack, setOpenSnack] = useState(true);
    return (<SnackbarMsg openSnack={openSnack} autohide={autohide} LoginErrorMsg={msg} SnackSeverity={severity} setOpenSnack={setOpenSnack}></SnackbarMsg>)

}