  const db=require('../models');
  const Operation=db.Operation;
   
       
  



exports.findAll = (req, res) => {
  const page = parseInt(req.query.page) || 1; // Récupération du numéro de page depuis les paramètres de requête, sinon par défaut page 1
  const perPage = 3; // Nombre d'éléments à afficher par page
  const offset = (page - 1) * perPage; // Calcul de l'offset à partir du numéro de page

  const order = [['date_de_creation', 'ASC']]; // Tri par date de création en ordre croissant

  // Utilisation de findAndCountAll pour obtenir le nombre total d'éléments et les données
  Operation.findAndCountAll({ limit: perPage, offset: offset, order: order })
    .then(result => {
      const data = result.rows;
      const totalItems = result.count;

      res.send({ data, totalItems });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des operations."
      });
    });
};

exports.addOperation= (req, res)=>{ 

  const { description_operation } = req.body;

 
   
  Operation.create({ description_operation })
            
    .then((operation) => {
      res.status(200).send({
        message: 'Operation created successfully.',
        operation
      });
    })
        
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'An error occurred while creating the operation.' });
    });
}

   
  exports.getByDescription = (req, res) => {
    const description_operation = req.params.description_operation;
    
    Produit.findOne({
      where: {description_operation: description_operation},
    })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Impossible de trouver l'opération avec cette description"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur s'est produite lors de la récupération de l'opération avec cette description"
      });
    });
  };
  
 
    exports.deleteByOperation = async (req, res) => {
      try {
        const { description_operation } = req.params;
    
        // Vérifier si l'opération existe
        const operation = await Operation.findOne({
          where: { description_operation }
        });
        if (!operation) {
          return res.status(404).send({
            message: `L'opération avec la description ${description_operation} n'a pas été trouvée.`
          });
        }
    
        // Supprimer l'opération
        await operation.destroy();
    
        res.send({
          message: `L'opération avec la description ${description_operation} a été supprimée avec succès.`
        });
      } catch (err) {
        console.error(err);
        res.status(500).send({
          message: "Une erreur s'est produite lors de la suppression de l'opération."
        });
      }
    };
    exports.updateByDescription = (req, res) => {
      const description_operation = req.params.description_operation ;
    
      Operation.update(
        { 
          description_operation: req.body.description_operation,
          date_mise_a_jour: new Date() // définir la date de mise à jour sur la date et l'heure actuelles
        }, 
        {
          where: { description_operation: description_operation }
        }
      )
      .then(num => {
        if (num == 1) {
        res.send({
        message: "L'opération a été mise à jour avec succès."
        });
        } else {
        res.send({
        message: "Impossible de mettre à jour l'opération avec la description ${description}. L'opération n'a pas été trouvée."
        });
        }
        })
        .catch(err => {
        res.status(500).send({
        message: "Une erreur s'est produite lors de la mise à jour de l'opération avec la description " + description
        });
        });
        };
    exports.checkDescription = (req, res) => {
    Operation.findOne({
    where: {
  description_operation: req.params.description_operation,
    },
    })
    .then((operation) => {
    res.send({ exists: !!operation });
    })
    .catch((err) => {
    res.status(500).send({
    message:
    err.message || "Une erreur s'est produite lors de la vérification de l'operation .",
    });
    });
    };




 