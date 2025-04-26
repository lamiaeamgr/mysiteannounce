import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = ({ annonces = [] }) => {
  if (!annonces || !Array.isArray(annonces)) {
    return <p>Chargement des données...</p>;
  }

  const categories = {};
  annonces.forEach((annonce) => {
    categories[annonce.titre] = (categories[annonce.titre] || 0) + 1;
  });

  const villes = {};
  annonces.forEach((annonce) => {
    villes[annonce.ville] = (villes[annonce.ville] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Nombre d'annonces",
        data: Object.values(categories),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: Object.keys(villes),
    datasets: [
      {
        data: Object.values(villes),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#F44336"],
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
      <h2>📊 Tableau de bord</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "45%" }}>
          <h3>📌 Annonces par catégorie</h3>
          <Bar data={barData} />
        </div>
        <div style={{ width: "45%" }}>
          <h3>🌍 Annonces par ville</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
