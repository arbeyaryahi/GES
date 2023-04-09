import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperationsService } from 'src/app/services/operations.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoutoperations',
  templateUrl: './ajoutoperations.component.html',
  styleUrls: ['./ajoutoperations.component.css']
})
export class AjoutoperationsComponent implements OnInit {

    description_operation: any;
    
 
  constructor( private _operation: OperationsService, private router :Router) { }
  
ajouter() {
  if (!this.description_operation) {
  // Vérifier si le champ matricule est rempli
  Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'remplir la description de la nouvelle operation!',
  });
  return;
  }
  
  
  // Vérifier si la matricule existe déjà
     this._operation.checkOperation(this.description_operation).subscribe({
       next: (res) => {
       if (res.exists) {
       Swal.fire({
       icon: 'error',
      title: 'Oops...',
       text: " l'operation existe déjà"
      });
        } }});

  // Appel de la méthode de création
  this._operation.create(this.description_operation).subscribe({
  next: (res) => {
  Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: "l'operation' a été créé avec succès",
  showConfirmButton: false,
  timer: 1500,
  });
  this.router.navigate(['./dashboard/configuration/operations/listoperations']);
  // Réinitialiser les valeurs du formulaire après l'ajout réussi de l'utilisateur
  this.description_operation = '';
 
  },
  error: (err) => {
  console.log(err);
  }

  
  
 
  });
}

 

  ngOnInit(): void {

    this.description_operation 

 };

}




     
  
  
  
  
  
  
  
  



