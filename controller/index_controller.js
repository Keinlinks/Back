const { Pool } = require("pg");
const fs = require("fs");
require("dotenv").config();

const sslCert = fs.readFileSync(
  "C:/Users/Kevin/Documents/proyectos/Back/controller/us-east-2-bundle.pem"
);

const pool = new Pool({
  host: process.env.ENDPOINT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
  statement_timeout: 10000,
  ssl: {
    ca: sslCert,
  },
});
const getMusic = (req, res) => {
  pool.query("SELECT * FROM kmusic.songs", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.rows);
      res.json(result.rows);
    }
  });
};
const postMusic = (req, res) => {
  console.log("entrando");
  const query =
    "INSERT INTO public.song (nombre, compositor, genero, programa, tonalidad, instrumentos, duracion, imagen, estado) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);";
  const values = [
    req.body.nombre,
    req.body.compositor,
    req.body.genero,
    req.body.programa,
    req.body.tonalidad,
    req.body.instrumentos,
    req.body.duracion,
    req.body.imagen,
    req.body.estado,
  ];
  if (validarJSON(req.body)) {
    pool.query(query, values, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
    res.send("Datos subidos! ");
  } else {
    res.send("Error al subir datos ");
  }
};

const deleteMusic = (req, res) => {
  console.log("Borrando");
  const query = 'DELETE FROM public.song WHERE "ID" = $1;';
  values_id = [req.body.ID];
  if (validarJSON_id(req.body)) {
    console.log(values_id);
    pool.query(query, values_id, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("si se borro");
      }
    });
    res.send("Se borro correctamente");
  } else {
    res.send("ERROR no se borro");
  }
};

const updateMusic = (req, res) => {
  console.log("actualizar...");
};

module.exports = { getMusic, postMusic, deleteMusic, updateMusic };

function validarJSON(json) {
  if (
    !json.nombre ||
    !json.compositor ||
    !json.genero ||
    !json.programa ||
    !json.tonalidad ||
    !json.instrumentos ||
    !json.duracion ||
    !json.imagen ||
    !json.estado
  ) {
    return false;
  }
  return true;
}
function validarJSON_id(json) {
  if (!json.ID) {
    return false;
  }
  return true;
}
