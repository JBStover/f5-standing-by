import { Outlet, Navigate } from "react-router";
import { useSelector} from "react-redux";

const ProtectedRoute = () => {
    const currentUser = useSelector(state => state.users);

    console.log(currentUser);
    console.log(currentUser.isLoggedIn);    

    if (currentUser.isLoggedIn == false) {
        return <Navigate to="/login" />       
    };

    return <Outlet />;

};

export default ProtectedRoute;