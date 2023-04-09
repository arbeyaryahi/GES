const db=require('../models');

const Produit=db.Produit;


   exports.findAll = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Récupération du numéro de page depuis les paramètres de requête, sinon par défaut page 1
    const perPage = 3; // Nombre d'éléments à afficher par page
    const offset = (page - 1) * perPage; // Calcul de l'offset à partir du numéro de page
    const order = [['date_de_creation', 'ASC']]; // Tri par date de création en ordre croissant
     // Utilisation de findAndCountAll pour obtenir le nombre total d'éléments et les données
    Produit.findAndCountAll({ limit: perPage, offset: offset, order: order }) // Utilisation de limit et offset pour paginer les résultats
    .then(result => {
      const data = result.rows;
      const totalItems = result.count;

      res.send({ data, totalItems });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des produits."
      });
    });
  };
    

 
  exports.addProduit= (req, res)=>{ 

    const { num_serie } = req.body;
    const { description_produit } = req.body;
   
   
         Produit.create({num_serie, description_produit })
            
                .then(() => {
                  res.status(201).send({
                    message: 'produit created successfully.',
                   Produit
                  });
                })
        
              .catch((error) => {
              console.log(error);
              res.status(500).send({ message: 'An error occurred while creating the product.' });
      });
  }
  
   
 

  
  
exports.getbyNumSerie = (req, res) => {
        const num_serie = req.params.num_serie;
        
        Produit.findOne({
          where: {num_serie: num_serie},
        })
        .then(data => {
          if (data) {
            res.send(data);
          } else {
            res.status(404).send({
              message: "Impossible de trouver le produit  avec ce numero de serie "
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Une erreur s'est produite lors de  la recuperation de  le produit  avec ce numero de serie "
          });
        });
      };
      
     
exports.deleteByNumSerie = async (req, res) => {
          try {
            const { num_serie } = req.params;
        
            // Vérifier si l'opération existe
            const operation = await Produit.findOne({
              where: { num_serie }
            });
            if (!operation) {
              return res.status(404).send({
                message: `Le produit  avec le numero de serie  ${num_serie } n'a pas été trouvée.`
              });
            }
        
            // Supprimer l'opération
            await Produit.destroy();
        
            res.send({
              message: `Le produit  avec le numero de serie  ${num_serie } a été supprimée avec succès.`
            });
          } catch (err) {
            console.error(err);
            res.status(500).send({
              message: "Une erreur s'est produite lors de la suppression de produit."
            });
          }
        };
        
    
    
    
      // Mettre à jour une opération par sa description
    
    exports.updateByNumSerie = (req, res) => {
      const num_serie = req.params.num_serie;
      
      Produit.update(req.body, {
      where: { num_serie:num_serie}
      })
      .then(num => {
      if (num == 1) {
      res.send({
      message: "Le produit a été mise à jour avec succès."
      });
      } else {
      res.send({
      message: "Impossible de mettre à jour Le produit  avec le numero de serie  ${num_serie }. Le produit n'a pas été trouvée."
      });
      }
      })
      .catch(err => {
      res.status(500).send({
      message: "Une erreur s'est produite lors de la mise à jour Le produit  avec le numero de serie  " +num_serie
      });
      });
      };
    
exports.checkNumSerie = (req, res) => {
  Produit.findOne({
  where: {
 num_serie: req.params.num_serie,
  },
  })
  .then((produit) => {
  res.send({ exists: !!produit });
  })
  .catch((err) => {
  res.status(500).send({
  message:
  err.message || "Une erreur s'est produite lors de la vérification de la numero de serie .",
  });
  });
  };