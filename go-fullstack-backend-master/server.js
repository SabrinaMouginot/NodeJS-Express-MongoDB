// const http = require("http");

// const server = http.createServer((req, res) => { //pour creer un server . CreateServer, fonction qui va avec nodejs. res = reponse
//   res.end("réponse du serveur !"); //A la fin, on a la réponse du server.
// });

// server.listen(process.env.PORT || 3000);

//je remplace le code par le suivant.

// const http = require("http");
// const app = require("./app");

// app.set("port", process.env.PORT || 3000);
// const server = http.createServer(app);

// server.listen(process.env.PORT || 3000); //ici, le port défini par l'ordi est 3000.


const http = require("http");
const app = require("./app");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);


// A partir du moment où on a collé ça dans le server.js , on ne touche plus au fichier. 
//On fera toutes les modif dans app.js