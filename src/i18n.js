import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Ventes Immobilier": "Real Estate Sales",
  "Vêtements": "Clothing",
  "Bijoux": "Jewelry",
  "Voitures": "Cars",
  "Électronique": "Electronics",
  "Accessoires & Bagagerie": "Accessories & Luggage",
  "Parfum": "Perfume",
      "Sign In": "Sign In",
      "Add Annonce": "Add Listing",
      "Switch to Dark Mode": "Switch to Dark Mode",
      "Switch to Light Mode": "Switch to Light Mode",
      "Top Catégorie": "Top Categories",
      "Filter by city": "Filter by city",
      "Filter by category": "Filter by category",
    },
  },
  fr: {
    translation: {
      
      "Ventes Immobilier": "Ventes Immobilier",
      "Vêtements": "Vêtements",
      "Bijoux": "Bijoux",
      "Voitures": "Voitures",
      "Électronique": "Électronique",
      "Accessoires & Bagagerie": "Accessoires & Bagagerie",
      "Parfum": "Parfum",
      "Sign In": "Se connecter",
      "Add Annonce": "Ajouter une annonce",
      "Switch to Dark Mode": "Passer en mode sombre",
      "Switch to Light Mode": "Passer en mode clair",
      "Top Catégorie": "Top Catégorie",
      "Filter by city": "Filtrer par ville",
      "Filter by category": "Filtrer par catégorie",
    },
  },
  es: {
    translation: {
      "Ventes Immobilier": "Ventas inmobiliarias",
  "Vêtements": "Ropa",
  "Bijoux": "Joyería",
  "Voitures": "Coches",
  "Électronique": "Electrónica",
  "Accessoires & Bagagerie": "Accesorios y equipaje",
  "Parfum": "Perfume",
      "Sign In": "Iniciar sesión",
      "Add Annonce": "Agregar anuncio",
      "Switch to Dark Mode": "Cambiar a modo oscuro",
      "Switch to Light Mode": "Cambiar a modo claro",
      "Top Catégorie": "Categorías principales",
      "Filter by city": "Filtrar por ciudad",
      "Filter by category": "Filtrar por categoría",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "fr", // Langue par défaut
  fallbackLng: "en",
  debug: true, // Ajouté pour voir les logs de changement de langue
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
