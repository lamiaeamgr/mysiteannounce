import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';  // Importation du Provider
import store from './store';  // Importation du store Redux

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Envelopper l'application avec le Provider */}
    <HashRouter>
  <App />
</HashRouter>
    </Provider>
  </React.StrictMode>
);

// Si tu veux commencer à mesurer les performances de ton app, passe une fonction
// pour enregistrer les résultats (par exemple : reportWebVitals(console.log))
// ou envoie-les à un endpoint d'analytics. En savoir plus : https://bit.ly/CRA-vitals
reportWebVitals();
