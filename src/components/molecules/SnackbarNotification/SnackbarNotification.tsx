import { Alert, AlertColor, Snackbar } from '@mui/material';
import React from 'react'

export interface SnackbarNotificationStateProps {
    type: AlertColor;
    open: boolean;
    message: string;
}

export interface SnackbarNotificationFunctionsProps {
    hadleOnClose: () => void;
}

export type SnackbarNotificationProps = SnackbarNotificationStateProps & SnackbarNotificationFunctionsProps;

const SnackbarNotification: React.FC<SnackbarNotificationProps> = (props: SnackbarNotificationProps) => {
    return (
        <React.Fragment>
            <Snackbar
                open={props.open}
                autoHideDuration={6000}
                onClose={() => props.hadleOnClose()}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => props.hadleOnClose()} severity={props.type} sx={{ width: '100%' }}>
                    {props.message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default SnackbarNotification;