










/*
router.post("/api/annonces", async (req, res) => {
  try {
    const nouvelleAnnonce = new Annonce(req.body);
    await nouvelleAnnonce.save();
    res.status(201).json({ success: true, message: "Annonce publiée avec succès.", annonce: nouvelleAnnonce });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de la création de l'annonce.", error });
  }
});

router.get("/api/annonces", async (req, res) => {
  try {
    const annonces = await Annonce.find().populate("creatby");
    res.status(200).json({ success: true, data: annonces });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des annonces.", error });
  }
});


formulaire
<form onSubmit={handleSubmit}>
  <input type="text" placeholder="Titre" name="titre" required />
  <textarea placeholder="Description" name="description" required></textarea>
  <select name="type" required>
    <option value="Service">Service</option>
    <option value="Besoin">Besoin</option>
  </select>
  <button type="submit">Publier</button>
</form>

afficher
{annonces.map((annonce) => (
  <div key={annonce._id} className="card">
    <h2>{annonce.titre}</h2>
    <p>{annonce.description}</p>
    <p>{annonce.type === "Service" ? "Service offert" : "Besoin exprimé"}</p>
    <p>{annonce.categorie}</p>
  </div>
))}



*/

/*

Fonctionnalité Bonus
Recherche et filtrage :
Ajouter une barre de recherche pour trouver des annonces spécifiques.
Permettre de filtrer par catégorie ou ville.
Système de messagerie :
Faciliter la mise en relation entre bénévoles et associations via une messagerie intégrée.

*/