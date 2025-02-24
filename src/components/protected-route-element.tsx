import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface IProtectedRouteElementProps {
  element: ReactNode;
  usersOnly?: boolean;
}

export default function ProtectedRouteElement({ element, usersOnly = false }: IProtectedRouteElementProps) {

  const { accessToken } = useSelector((state: any) => state.auth);

  const location = useLocation();
  const from = location.state?.from || '/';

  if (usersOnly && !accessToken) {
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }

  if (!usersOnly && accessToken) {
    return <Navigate to={from} replace />;
  }

  return element;
}