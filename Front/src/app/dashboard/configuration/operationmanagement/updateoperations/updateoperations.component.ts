import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationsService } from 'src/app/services/operations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateoperations',
  templateUrl: './updateoperations.component.html',
  styleUrls: ['./updateoperations.component.css']
})
export class UpdateoperationsComponent implements OnInit  {
    
   description_operation:any;
   operation:any;
  constructor(private act:ActivatedRoute , private _operation:OperationsService, private router:Router){}
    
      ngOnInit(): void {
        this.operation = {
          
         description_operation: ''
          
        };
        
  
        this.description_operation=this.act.snapshot.paramMap.get('description_operation');
  
        this._operation.getbydescriptionOperation(this.description_operation)
          .subscribe({
          next: (res) => {
           this.operation= res;
         },
        error: (err) => {
         console.log(err);
        }
        });
  
  
  
         }
  
  
  
  update(){
  
  this._operation.update(this.description_operation , this.operation)
          .subscribe({
            next: (res) => {
            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: "L'operation été  modofier avec succès.",
            showConfirmButton: false,
            timer: 3000
            })
            
              // Réinitialiser les valeurs du formulaire après l'ajout réussi de l'utilisateur
          this.operation.description_operation = '';
         
  
          this.router.navigate(['./dashboard/configuration/operations/listoperations']);
            },
           
            error: (err) => {
            console.log(err);
            }
            });
  
         }
  
  
  
  
  
  }
  
  
  
  
  
  
  
  
  
    
  
    
    
    
  
  
  
  
   