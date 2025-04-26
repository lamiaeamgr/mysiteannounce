import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './redux/actions/themeActions';
import { Link } from 'react-router-dom';
import './Header.css';
import { useTranslation } from "react-i18next";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const theme = useSelector((state) => state.theme.theme || 'light');

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerIconRef = useRef(null);

  const buttonWidthAddAnnonce = (i18n.language === 'fr') ? '140px' :
                               (i18n.language === 'en') ? '90px' :
                               (i18n.language === 'es') ? '130px' : '100px';

  const buttonWidthSignIn = (i18n.language === 'en') ? '70px' : '100px';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !burgerIconRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleSignIn = () => navigate('/signin');
  const handleAddAnnonce = () => navigate('/add-annonce');
  const handleThemeToggle = () => dispatch(toggleTheme());

  return (
    <header
    className="header"
    style={{
      backgroundColor: theme === 'dark' ? 'rgba(209, 197, 197, 0.1)' : '#fff', 
      color: '#fff', // Texte général toujours en blanc
      transition: 'background-color 0.3s, color 0.3s', // Transition douce pour les changements
    }}
  >
    <h1 
      className="logo"
      style={{
        color: theme === 'dark' ? '#fff' : '#000', // Titre en noir en mode sombre, en blanc en mode clair
      }}
    >
      QuickAnnonce
    </h1>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button className="sign-in-button" onClick={handleSignIn} style={{ width: buttonWidthSignIn }}>
        {t("Sign In")}
      </button>
      <button className="add-annonce-button" onClick={handleAddAnnonce} style={{ width: buttonWidthAddAnnonce }}>
        {t("Add Annonce")}
      </button>
      
      {/* Menu Burger */}
      <div className="burger-menu" style={{ display: 'inline-block', marginLeft: '10px', position: 'relative' }}>
        <button
          className="burger-icon"
          onClick={toggleMenu}
          ref={burgerIconRef}
          style={{
            fontSize: '18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',        
            color: theme === 'dark' ? '#fff' : '#333', // Couleur de l'icône ajustée
          }}
        >
          ☰
        </button>
        {menuOpen && (
          <div
            className="dropdown-menu"
            ref={menuRef}
            style={{
              position: 'absolute',
              left: '-120px',
              top: '40px',
              background: theme === 'dark' ? '#888' : '#d3d3d3',
              color: '#fff',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '5px',
              padding: '10px',
              minWidth: '130px',
              right: '40px',
            }}
          >
            <Link to="/dashboard" style={{ display: 'block', padding: '10px', color: '#fff', textDecoration: 'none' }}>
              {t("Dashboard")}
            </Link>
            <Link to="/logout" style={{ display: 'block', padding: '10px', color: '#fff', textDecoration: 'none' }}>
              {t("Logout")}
            </Link>
          </div>
        )}
      </div>
  
      {/* Theme Switch */}
      <div className="theme-switch">
        <label className="switch">
          <input type="checkbox" checked={theme === 'dark'} onChange={handleThemeToggle} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  </header>
  


  );
}

export default Header;
