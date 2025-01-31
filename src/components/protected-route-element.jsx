import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRouteElement({ element, usersOnly = false }) {

  const { accessToken } = useSelector((state) => state.auth);

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

ProtectedRouteElement.propTypes = {
  element: PropTypes.node,
  usersOnly: PropTypes.bool,
};
