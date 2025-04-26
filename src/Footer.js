import React from 'react';
import './Footer.css';  // Assure-toi d'avoir ce fichier CSS pour ton footer

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3>Quick Annonce</h3>
          <p>Découvrez nos produits divers et annonces dans des catégories variées, allant de l'immobilier aux accessoires de mode.</p>
        </div>

        <div className="footer-categories">
          <h4>Nos Catégories</h4>
          <ul>
            <li><a href="#ventes-immobilier">Ventes Immobilier</a></li>
            <li><a href="#vetements">Vêtements</a></li>
            <li><a href="#bijoux">Bijoux</a></li>
            <li><a href="#voitures">Voitures</a></li>
            <li><a href="#electronique">Électronique</a></li>
            <li><a href="#bagagerie">Accessoires & Bagagerie</a></li>
            <li><a href="#parfum">Parfum</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contactez-nous</h4>
          <ul>
            <li>Email: <a href="mailto:contact@quickannonce.com">contact@quickannonce.com</a></li>
            <li>Téléphone: <a href="https://example.com">+123 456 7890</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Quick Annonce - Tous droits réservés</p>
      </div>
    </footer>
  );
}

export default Footer;
