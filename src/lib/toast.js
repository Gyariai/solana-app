import { toast } from 'react-toastify';
import Setting from "../store.js"

let activeToastId = null;

export function successAlert(text) {
    if (activeToastId !== null) {
        toast.update(activeToastId, {
            render: text,
            position: Setting.positionAlert,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: Setting.typeAlert,
        });
    } else {
        activeToastId = toast.success(text, {
            position: Setting.positionAlert,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: Setting.typeAlert,
            onClose: () => {
                activeToastId = null;
            }
        });
    }
}

export function errorAlert(text) {
    if (activeToastId !== null) {
        toast.update(activeToastId, {
            render: text,
            position: Setting.positionAlert,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: Setting.typeAlert,
        });
    } else {
        activeToastId = toast.warn(text, {
            position: Setting.positionAlert,
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: Setting.typeAlert,
            onClose: () => {
                activeToastId = null;
            }
        });
    }
}
