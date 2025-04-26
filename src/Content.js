import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector"; // Import du sélecteur de langue
import "./Content.css"; // Pour la mise en page
import { FaTrash } from "react-icons/fa"; // Import de l'icône de suppression

function Content({ annonces, theme, user }) {
  const { t } = useTranslation();
  const initialCategories = [
    {
      id: 1,
      titre: t("Ventes Immobilier"),
      image: "ventesimmobilier.png",
      images: [
        "ventesimmobilier1.png",
        "ventesimmobilier2.png",
        "ventesimmobilier3.png",
        "ventesimmobilier4.png",
      ],
      titresAnnonces: [
        t("Maison contemporaine avec terrasse"),
        t("Villa moderne avec piscine"),
        t("Riad traditionnel rénové"),
        t("Maison de campagne avec jardin"),
      ],
      description: t("Maison à vendre"),
      prix: "500 000 MAD",
      ville: "Marrakech",
    },
    {
      id: 2,
      titre: t("Vêtements"),
      image: "clothe.png",
      images: ["clothe1.png", "clothe2.png", "clothe3.png", "clothe4.png"],
      titresAnnonces: [
        t("Sandale saint laurent pour femme"),
        t("Robe élégante en soie"),
        t("Blouson en cuir tendance"),
        t("Veste chic en velours côtelé"),
      ],
      description: t("Collection de vêtements"),
      prix: "250 MAD",
      ville: "Casablanca",
    },
    {
      id: 3,
      titre: t("Bijoux"),
      image: "bijoux.png",
      images: ["bijoux1.png", "bijoux2.png", "bijoux3.png", "bijoux4.png"],
      titresAnnonces: [
        t("Collier en or 18 carats"),
        t("Bracelet Or Vintage Luxe"),
        t("Bracelet artisanal en argent"),
        t("Montre Élégance et Raffinement"),
      ],
      description: t("Bijoux raffinés"),
      prix: "1 000 MAD",
      ville: "Rabat",
    },
    {
      id: 4,
      titre: t("Voitures"),
      image: "car.png",
      images: ["car1.png", "car2.png", "car3.png", "car4.png"],
      titresAnnonces: [
        t("Peugeot 208 gamme gt"),
        t("Mercedes-Benz G-Class"),
        t("Citroën C3 PureTech"),
        t("Volkswagen Tiguan ultra-performant"),
      ],
      description: t("Voiture de luxe"),
      prix: "200 000 MAD",
      ville: "Agadir",
    },
    {
      id: 5,
      titre: t("Électronique"),
      image: "electronique.png",
      images: [
        "electronique1.png",
        "electronique2.png",
        "electronique3.png",
        "electronique4.png",
      ],
      titresAnnonces: [
        t("Smartphone dernière génération"),
        t("Casque audio sans fil"),
        t("Apple Watch Ultra"),
        t("Ordinateur portable performant"),
      ],
      description: t("Gadget électronique"),
      prix: "1 500 MAD",
      ville: "Fès",
    },
    {
      id: 6,
      titre: t("Accessoires & Bagagerie"),
      image: "Accessoires & Bagagerie.png",
      images: [
        "Accessoires & Bagagerie1.png",
        "Accessoires & Bagagerie2.png",
        "Accessoires & Bagagerie3.png",
        "Accessoires & Bagagerie4.png",
      ],
      titresAnnonces: [
        t("Sac à dos en cuir"),
        t("Valise cabine ultra légère"),
        t("Montre connectée élégante"),
        t("Ceinture en cuir véritable"),
      ],
      description: t("Sacs, valises et accessoires"),
      prix: "150 MAD",
      ville: "Marrakech",
    },
    {
      id: 7,
      titre: t("Parfum"),
      image: "parfum.png",
      images: ["parfum1.png", "parfum2.png", "parfum3.png", "parfum4.png"],
      titresAnnonces: [
        t("Parfum boisé intense"),
        t("Eau de toilette florale"),
        t("Essence orientale envoûtante"),
        t("Cologne fraîche et légère"),
      ],
      description: t("Parfum de luxe"),
      prix: "300 MAD",
      ville: "Casablanca",
    },
  ];
  const [categories, setCategories] = useState([...initialCategories, ...annonces]);
  useEffect(() => {
    const updatedCategories = initialCategories.map((categorie) => ({
      ...categorie,
      titre: t(categorie.titre),
      titresAnnonces: categorie.titresAnnonces.map((titre) => t(titre)),
      description: t(categorie.description),
    }));
    
    setCategories(updatedCategories);  // Mettre à jour les catégories avec les traductions
  
    // Ajout des annonces dynamiques (cela ne remplace pas, ça s'ajoute)
    if (annonces && annonces.length > 0) {
      setCategories((prevCategories) => [...prevCategories, ...annonces]);
    }
  }, [t, annonces]); // Le useEffect se déclenche chaque fois que la langue change ou les annonces sont mises à jour
  
  // Fonction mise à jour pour supprimer une seule annonce précise
  const handleDelete = (categorieId, annonceIndex) => {
    setCategories((prevCategories) =>
      prevCategories.map((categorie) =>
        categorie.id === categorieId
          ? {
              ...categorie,
              titresAnnonces: categorie.titresAnnonces.filter((_, index) => index !== annonceIndex),
              images: categorie.images.filter((_, index) => index !== annonceIndex),
            }
          : categorie
      )
    );
  };

  const [startIndex, setStartIndex] = useState(0);
  const [cityFilter, setCityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const categoriesPerPage = 5;

  useEffect(() => {
    const bodyElement = document.body;
    if (theme === "dark") {
      bodyElement.classList.add("dark-mode");
    } else {
      bodyElement.classList.remove("dark-mode");
    }
  }, [theme]);

  const handleScroll = (direction) => {
    if (direction === "left") {
      setStartIndex(
        startIndex === 0 ? categories.length - categoriesPerPage : startIndex - 1
      );
    } else {
      setStartIndex(
        startIndex === categories.length - categoriesPerPage ? 0 : startIndex + 1
      );
    }
  };

  const filteredCategories = categories.filter(
    (categorie) =>
      (cityFilter ? categorie.ville === cityFilter : true) &&
      (categoryFilter ? t(categorie.titre) === categoryFilter : true) // Utiliser t pour la traduction
  );
  

  return (
    <div className={`content ${theme === "dark" ? "dark-mode" : ""}`}>
      {/* Langue et titre sur la même ligne */}
      <div className="header-line">
        <h2 className="content-title">{t("Top Catégorie")}</h2>
        <div className="language-selector-container">
          <LanguageSelector />
        </div>
      </div>

      <div className="filters">
        <div className="filter">
          <i className="fas fa-map-marker-alt filter-icon"></i>
          <select
            onChange={(e) => setCityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">{t("Filter by city")}</option>
            {[...new Set(categories.map((categorie) => categorie.ville))].map(
              (city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              )
            )}
          </select>
        </div>

        <div className="filter">
          <i className="fas fa-th-large filter-icon"></i>
          <select
  onChange={(e) => setCategoryFilter(e.target.value)}
  className="filter-select"
>
  <option value="">{t("Filter by category")}</option>
  {[...new Set(categories.map((categorie) => categorie.titre))].map(
    (category, index) => (
      <option key={index} value={category}>
        {t(category)} {/* Traduction des catégories */}
      </option>
    )
  )}
</select>


        </div>
      </div>

      <div className="categories-container">
        <button className="scroll-btn left" onClick={() => handleScroll("left")}>
          ‹
        </button>
        <div
          className="categories-list"
          style={{ transform: `translateX(-${startIndex * 170}px)` }}
        >
          {filteredCategories
            .slice(startIndex, startIndex + categoriesPerPage)
            .map((categorie) => (
              <div key={categorie.id} className="categorie-card">
                <img
                  src={categorie.image.startsWith("blob:") ? categorie.image : require(`./assets/${categorie.image}`)}
                  alt={categorie.titre}
                  className="categorie-image"
                />
                <h3>{categorie.titre}</h3>
              </div>
            ))}
        </div>
        <button
          className="scroll-btn right"
          onClick={() => handleScroll("right")}
        >
          ›
        </button>
      </div>

      <div className="categories-details">
        {filteredCategories.map((categorie) => (
          <div key={categorie.id} className="categorie-row">
            <h3 className="categorie-row-title">{categorie.titre}</h3>
            <div className="categorie-images-row">
              {categorie.images.map((img, index) => (
                <div key={index} className="categorie-card-detail">
                  <div className="categorie-info">
                    
                    <h4>
                      {categorie.titresAnnonces?.[index] || t("Titre non disponible")}
                      {/* Affichage de l'icône de suppression à côté de chaque titre d'annonce */}
                      {user?.role === "admin" && (
                        <FaTrash 
                          className="delete-icon"
                          onClick={() => handleDelete(categorie.id, index)} // Suppression spécifique de l'annonce
                          title={t("Supprimer l'annonce")}
                        />
                      )}
                    </h4>
                    <p>{categorie.description}</p>
                    <div className="categorie-location">
                      <i className="location-icon fas fa-map-marker-alt"></i>
                      {categorie.ville}
                    </div>
                    <div className="categorie-price">{categorie.prix}</div>
                  </div>
                  <img
                    src={img.startsWith("blob:") ? img : require(`./assets/${img}`)}
                    alt={categorie.titresAnnonces?.[index] || t("Image")}
                    className="categorie-sub-image"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
