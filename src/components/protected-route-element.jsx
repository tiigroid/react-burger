import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRouteElement({ element }) {

  const location = useLocation();
  
  const { accessToken } = useSelector((state) => state.auth);

  if (accessToken) {
    return element
  } else {
    return <Navigate to='/login' state={{ from: location.pathname }}/>
  }
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.node,
}