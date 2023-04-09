
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


const multer = require('multer');

const XLSX = require('xlsx'); //c'est une bibliotheque


const moment = require('moment');
const db = require("./models");

const path = require('path');

const fs=require('fs');





app.use(cors());




db.sequelize.sync({ alter: true }).then(() => {
  console.log(" Sync DB");
  
}).catch((err) => {
  console.log("Failed to sync db: " + err.message);
});



// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



  

const myStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      let fl = file.originalname.split('.'); // séparer le nom de fichier et l'extension
      let ext = fl.pop(); // extraire l'extension
      let filename = fl.join('') + '-' + Date.now() + '.' + ext; // ajouter un timestamp au nom de fichier
      cb(null, filename);
    }
  });
  
  const upload = multer({
    storage: myStorage,
  });
  
   //hedhi pour upload file 
  app.post('/upload', upload.any('file'), async (req, res) => {
    try {
      if (!req.files || !req.files[0]) {
        res.json({ message: 'no file uploaded' });
      }
     
      const file = req.files[0];
     
      
  
      
      // Vérifiez si le fichier est au format Excel
      const ext = path.extname(file.originalname);
      if (ext !== '.xlsx' && ext !== '.xls') {
        fs.unlinkSync(file.path);//n'enregistre pas le fichier dans le dossier uploads
        return res.status(400).send({ message: "Seuls les fichiers Excel avec l'extension .xlsx  ou .xlssont autorisés." });
      }
  
      // Chargez le fichier Excel en utilisant XLSX
      const workbook = XLSX.readFile(file.path);
  
      // Obtenez le premier feuillet de calcul
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
    
      // Vérifiez si le fichier a les colonnes nécessaires
      const requiredColumns = ['id_trace', 'trace_test', 'num_serie', 'description_operation', 'createdAt', 'updatedAt'];
      const header = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];
      const missingColumns = requiredColumns.filter(col => !header.includes(col));
      if (missingColumns.length > 0) {
        fs.unlinkSync(file.path);
        return res.status(400).send({ message: `Attention ! Votre fichier ne contient pas les colonnes nécessaires. Avant de l'importer, apportez les modifications nécessaires pour pouvoir l'afficher.` });
      }
  
      // Convertissez les données du feuillet de calcul en tableau d'objets JSON
      const data = XLSX.utils.sheet_to_json(sheet);
  
      // Parcourez chaque objet JSON et enregistrez-le dans la table trace_tests en utilisant Sequelize
      for (let item of data) {
        // Vérifiez si l'id_trace existe déjà dans la table TraceTests
        const existingItem = await db.TraceTests.findOne({ where: { id_trace: item.id_trace } });
        if (existingItem) {
          fs.unlinkSync(file.path);
          // Si l'élément existe déjà, affichez un message et passez à l'élément suivant
          return res.status(400).send({ message: ' ce Fichier existe deja!' });
        }
    
        // Si l'élément n'existe pas encore, créez-le
        await db.TraceTests.create({
          id_trace: item.id_trace,
          trace_test: item.trace_test,
          num_serie: item.num_serie,
          description_operation: item.description_operation,
          createdAt: moment(item.createdAt, 'DD/MM/YYYY HH:mm:ss.SSSSSSZ').toDate(),
          updatedAt: moment(item.updatedAt, 'DD/MM/YYYY HH:mm:ss.SSSSSSZ').toDate()
        });
      }
    
      // Répondez avec un message de succès
      res.json({ message: 'Le fichier a été importé avec succès.' });
    }
    catch (err) {
      console.log(err);
      fs.unlinkSync(file.path);
      res.status(500).send('Une erreur s\'est produite lors de l\'importation du fichier.');
    }
  });
    

app.get('/trace_tests/alltraces', (req, res) => {
  db.TraceTests.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving trace tests."
      });
    });
});
  



require('./routes/operation.route')(app);
require('./routes/produit.route')(app);


 
app.listen(3000, '0.0.0.0', () => {
  console.log("Serveur lancé sur le port 3000");
});



  






  
  
