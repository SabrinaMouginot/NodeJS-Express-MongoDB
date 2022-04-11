const Thing = require("./models/thing");
const mongoose = require("mongoose");
//Middleware
const express = require("express");

const app = express();

app.use(express.json());

//POUR EMPECHER DE LAISSER pASSER LES ERREURS QUAND QQ UN ESSAIE DE NOUS ENTRER DU CODE FAUX
app.use((req, res, next) => {
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

app.use("/api/stuff", (req, res, next) => {
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff); //200 signifie que la requête a fonctionné.
});

//   const Thing = require("./models/thing");
mongoose
  .connect(
    "mongodb+srv://Sabrina:Grenouille//52@cluster0.pqpha.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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

module.exports = app;
