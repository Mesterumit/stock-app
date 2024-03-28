import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRouter = () => {
    const currentUser = sessionStorage.getItem('username') || false;

    if(!currentUser){
        toast.error('You need to login first')
        return <Navigate to="/" replace/>
    }else{
        return <Outlet/>
    }
}

export default PrivateRouter