import { toast } from "react-toastify";


function NotificationError(message) {
    return toast.error(message, {
position: "top-center",
autoClose: false,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: 1,
theme: "light",
})
}

export default NotificationError;