import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from './redux/actions/authActions';
import './Logout.css';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser()); // Déconnecter l'utilisateur
    navigate('/signin'); // Rediriger vers la page de connexion
  }, [dispatch, navigate]);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
