const Thing = require("./models/thing");
const mongoose = require("mongoose");
//Middleware
const express = require("express");

const app = express();

mongoose
  .connect(
    "mongodb+srv://Lerna:Ploploplop@cluster0.ufuz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//POUR EMPECHER DE LAISSER PASSER LES ERREURS QUAND QQ UN ESSAIE DE NOUS ENTRER DU CODE FAUX
// app.use((req, res, next) => {
//   app.post("/api/stuff", (req, res, next) => {
//     //post pour envoyer et on remplacer le post par get pour recevoir l'info
//     // Mildeware, il permet d'envoyer un objet
//     console.log(req.body);
//     res.status(201).json({
//       //201 signifie qu'on a réussi à modifier la bdd
//       message: "Objet créé !",
//     });
//   });
app.post("/api/stuff", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

// app.use("/api/stuff", (req, res, next) => {
//   const stuff = [
//     {
//       _id: "oeihfzeoi",
//       title: "Mon premier objet",
//       description: "Les infos de mon premier objet",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       price: 4900,
//       userId: "qsomihvqios",
//     },
//     {
//       _id: "oeihfzeomoihi",
//       title: "Mon deuxième objet",
//       description: "Les infos de mon deuxième objet",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       price: 2900,
//       userId: "qsomihvqios",
//     },
//   ];
//   res.status(200).json(stuff); //200 signifie que la requête a fonctionné.
// });

app.get("/api/stuff", (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/stuff/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

module.exports = app;
