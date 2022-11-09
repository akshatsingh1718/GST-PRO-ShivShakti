import { Navigate, Outlet } from 'react-router-dom';
import { login, selectUser } from 'renderer/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const PrivateRoutes = () => {
  const user = useSelector(selectUser);

  return user?.is_authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
