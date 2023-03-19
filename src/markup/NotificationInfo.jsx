import { toast } from "react-toastify";


function NotificationInfo(message) {
    return toast.info(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
}

export default NotificationInfo;