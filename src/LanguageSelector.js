import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem("language") || "fr");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const changeLanguage = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div style={styles.container}>
      <select value={language} onChange={changeLanguage} style={styles.select}>
        <option value="fr">🇫🇷 Français</option>
        <option value="en">🇬🇧 English</option>
        <option value="es">🇪🇸 Español</option>
      </select>
    </div>
  );
};

const styles = {
  container: {
    display: "flex", // Utilise flexbox pour aligner les éléments
    justifyContent: "flex-end", // Aligne le sélecteur à droite
    padding: "10px",
    marginTop: "100px", // Correction de "MarginTop" -> "marginTop"
    position: "absolute", // Ajouté ici pour positionner le sélecteur à droite
    right: "20px",
    top: "20px",
    zIndex: 10, // Modification de "z-index" pour correspondre à la bonne syntaxe
  },
  select: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "1px solid #ccc",
  },
};

export default LanguageSelector;
