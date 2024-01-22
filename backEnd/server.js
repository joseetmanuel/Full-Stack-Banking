"use strict";

// importar
var express = require("express");
var bodyParser = require("body-parser");
var Connection = require("tedious").Connection;

// configura bd
var config = {
  server: "mitbadbank.database.windows.net", //update me
  authentication: {
    type: "default",
    options: {
      userName: "joseetmanuel@mitbadbank", //update me
      password: "Jose13*123", //update me
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: "mit_bad_bank", //update me
  },
};

var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

// instanciar
var app = express();
// para datos en mensaje
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// ruteo

// Función de regreso de mensaje
function regreso(mensaje, res) {
  var SendObj = { Msj: mensaje };
  var stringData = JSON.stringify(SendObj);

  // Indicamos el tipo de contenido a devolver en las cabeceras de nuestra respuesta
  res.contentType("application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.send(stringData);
}

app.get("/", function (req, res) {
  return regreso("Hola Mundo", res);
});

app.get("/get_all_data", function (req, res) {
  var result = [];
  var connection = new Connection(config);

  connection.on("connect", function (err) {
    // If no error, then good to proceed.
    console.log("Connected");
    var request = new Request("get_all_data;", function (err) {
      if (err) {
        console.log("Entro en el ERROR");
        console.log(err);
      } else {
        console.log("Debería ir aqui el erro");
      }
    });

    request.on("row", function (columns) {
      let row = {};
      columns.forEach(function (column) {
        let name = column["metadata"]["colName"];
        let value = column.value;
        row[name] = value;
      });
      result.push(row);
    });

    request.on("done", function (rowCount, more) {
      console.log(rowCount + " rows returned");
      console.log("done");
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
      connection.close();
      res.contentType("application/json");
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      console.log("requestCompleted");
      res.send(result);
    });
    connection.execSql(request);
  });

  connection.connect();
});

// escuchar
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`Servicio escuchando en el puerto ${PORT}`);
});
// [END gae_node_request_example]

module.exports = app;
