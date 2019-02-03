// const express = require("express");
// const bodyParser = require("body-parser");
// const http = require("http");
// const fs = require("fs");
// const app = express();
// app.use(cors())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({
 extended: false
 }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header(
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept"
 )
 res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

 next();
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`));
// ------------------------------------------calcul for residential ------------------------------------------
app.post("/res", function(req, res) {
  let { price, nbfloors, nbapartments, feespercent } = req.body;
  let apartPerFloors = parseInt(Math.ceil(nbapartments / nbfloors));
  let nbcolumns = parseInt(Math.ceil(nbfloors / 20));
  let cagesPerFloors = parseInt(Math.ceil(apartPerFloors / 6));
  let nbcageses = parseInt(Math.ceil(cagesPerFloors * nbcolumns));
  let totalsfrais = parseFloat((nbcageses * price).toFixed(2));
  let fees = totalsfrais * feespercent;
  let feess = fees.toFixed(2);
  let totalreal = fees + totalsfrais;
  let totalreall = totalreal.toFixed(2);
  fees1 = feess.toString();
  totalsfrais1 = totalsfrais.toString();
  nbcages1 = nbcageses.toString();
  totalreal1 = totalreall.toString();
  res.json({
    nbcages: nbcages1,
    totalsfrais: totalsfrais1,
    totalreal: totalreal1,
    fees: fees1
  });
});
// ------------------------------------------calcul for commercial ------------------------------------------

app.post("/com", function(req, res) {
  let { price, nbcages, feespercent } = req.body;
  let nbcageses = parseInt(nbcages);
  // console.log("nbcages" + nbcageses);
  let totalsfrais = parseFloat((nbcageses * price).toFixed(2));
  // console.log("totalsfrais" + totalsfrais);
  let fees = parseFloat((totalsfrais * feespercent).toFixed(2));
  // console.log("fees" + fees);
  // console.log("fees" + fees);
  let totalreal = fees + totalsfrais;
  let totalreall = totalreal.toFixed(2);
  // console.log("totalreal" + totalreal);
  fees1 = fees.toString();
  totalsfrais1 = totalsfrais.toString();
  nbcages1 = nbcageses.toString();
  totalreal1 = totalreall.toString();
  res.json({
    nbcages: nbcages1,
    totalsfrais: totalsfrais1,
    totalreal: totalreal1,
    fees: fees1
  });
});
// ------------------------------------------calcul for corporate && hybrid ------------------------------------------

app.post("/corphyb", function(req, res) {
  let {
    nbocperfloors,
    nbbassements,
    nbcolumns,
    nbfloors,
    price,
    feespercent
  } = req.body;
  nbfloors = parseInt(nbfloors);
  nbbassements = parseInt(nbbassements);
  nbocperfloors = parseInt(nbocperfloors);
  nbcolumns = parseInt(nbcolumns);
  price = parseInt(price);

  let floorstot = nbfloors + nbbassements;
  console.log("floorstot" + floorstot);
  let ffs1 = nbocperfloors * floorstot;
  console.log("ffs1" + ffs1);

  let occfl1000 = Math.ceil(ffs1 / 1000);
  console.log("occfl1000" + occfl1000);

  let calccol = Math.ceil(occfl1000 / nbcolumns);
  console.log("calccol" + calccol);

  let nbcageses = calccol * nbcolumns;
  console.log("nbcageses" + nbcageses);

  let totalsfrais = parseFloat((nbcageses * price).toFixed(2));
  console.log("totalsfrais :" + totalsfrais);
  let fees = parseFloat((totalsfrais * feespercent).toFixed(2));

  console.log("fees :" + fees);

  let totalreal = parseFloat((fees + totalsfrais).toFixed(2));
  console.log("totalreal :" + totalreal);

  fees1 = fees.toString();
  totalsfrais1 = totalsfrais.toString();
  nbcages1 = nbcageses.toString();
  totalreal1 = totalreal.toString();
  res.json({
    nbcages: nbcages1,
    totalsfrais: totalsfrais1,
    totalreal: totalreal1,
    fees: fees1
  });
});

