import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddAnnonce.css";
import { useTranslation } from 'react-i18next';



function AddAnnonce({ setAnnonces, user }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
 
  const [previewImage, setPreviewImage] = useState(null);
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();



  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!user && !storedUser) {
      navigate("/sign-in");
    }
  }, [user, navigate]);
  

  // Gestion de l'image et prévisualisation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      // Revoke the old URL only if it exists
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
  
      // Create a new object URL and set the preview image state
      const newPreviewImage = URL.createObjectURL(file);
    setPreviewImage(newPreviewImage); 
    
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifie si l'utilisateur est connecté avant d'ajouter l'annonce
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!user && !storedUser) {
      navigate("/sign-in"); // Redirige si non connecté
      return;
    }

    setIsSubmitting(true);

    const annonceData = {
      id: new Date().getTime(),
      titre: title,
      description,
      prix: price,
      category,
      image: previewImage || null,
      ville: city,
      images: [previewImage],
    };

    // Mise à jour des annonces dans l'état global
    setAnnonces((prevAnnonces) => [...prevAnnonces, annonceData]);

    // Réinitialisation du formulaire
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("");
    setPreviewImage(null)
    setPreviewImage(null);
    setCity("");
    setIsSubmitting(false);

    navigate("/content"); // Redirige vers la liste des annonces
  };

  return (
    <div className="add-annonce">
      <h2>Ajouter une annonce</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
        <label htmlFor="category">{t("Catégorie")}</label>
<select
  id="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  required
>
  <option value="">{t("Sélectionner une catégorie")}</option>
  <option value="ventes_immobilier">{t("Ventes Immobilier")}</option>
  <option value="vetements">{t("Vêtements")}</option>
  <option value="bijoux">{t("Bijoux")}</option>
  <option value="voitures">{t("Voitures")}</option>
  <option value="electronique">{t("Électronique")}</option>
  <option value="accessoires_bagagerie">{t("Accessoires & Bagagerie")}</option>
  <option value="parfum">{t("Parfum")}</option>
</select>

        </div>
        <div className="form-group">
          <label htmlFor="city">Ville</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        
        {previewImage && (
           <div className="image-preview">
             <p>Prévisualisation :</p>
                <img src={previewImage} alt="Prévisualisation" className="preview" />
                     </div>
)}


        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default AddAnnonce;
