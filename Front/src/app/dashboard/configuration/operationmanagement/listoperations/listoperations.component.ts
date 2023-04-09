
import { OperationsService } from 'src/app/services/operations.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import * as moment from 'moment-timezone';
const timeZone = 'Africa/Tunis'; // Définissez le fuseau horaire souhaité



@Component({
  selector: 'app-listoperations',
  templateUrl: './listoperations.component.html',
  styleUrls: ['./listoperations.component.css']
})


export class ListoperationsComponent implements OnInit  {
  operationSearch: string = '';
 operations:any=[];
 operationsFiltered: any = [];


 
// Variables de pagination
currentPage = 1;
totalPages: number[] = [];

 
 constructor(private _operation: OperationsService) {}

 ngOnInit(): void {
  this.getOperations();
}


getOperations(page: number=1): void {
  this._operation.getAll(page).subscribe({
    next: (res) => {
      this.operations = res.data;
      this.operationsFiltered = res.data;
      this.currentPage = page;
      this.calculateTotalPages(res.totalItems);
      console.log(res);
    },
    error: (err) => {
      console.log(err);
    },
  });
}


printTable() {
  

 window.print()
 
}


calculateTotalPages(totalItems: number): void {
  const itemsPerPage = 3;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  this.totalPages = Array.from({ length: totalPages }, (_, i) => i + 1);
}

changePage(page: number): void {
  if (page >= 1 && page <= this.totalPages.length) {
    this.getOperations(page);
  }
}


filterByoperation(): void {
  this.operationsFiltered = this.operations.filter((operation: any) => {
    if(operation.description_operation) {
      return operation.description_operation.toLowerCase().includes(this.operationSearch.toLowerCase());
    }
    return false;
  });
}






delete(description_operation:string){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
     this._operation.delete(description_operation)
     .subscribe(
      {
        next:(res)=>{
         this.ngOnInit();
         Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: "l'operation' est bien supprimer",
          showConfirmButton: false,
          timer: 1500
        })
        },
        error:(err)=>{
          console.log(err);
        }
      }
        );

    }
  })
}


exportToExcel(): void {
  // 1* Créer un nouveau classeur Excel  à l'aide de la méthode "XLSX.utils.book_new()
  //un classeur est un fichier Excel qui contient une ou plusieurs feuilles de calcul.
  const workbook = XLSX.utils.book_new(); 


  // Convertir les données filtrées en tableau de lignes dont chaque ligne  contient les données de trace de test correspondantes
  const rows = [
    ['description_operation', 'date_de_creation', 'date_mise_a_jour'], // Ajouter les noms de colonnes ici
  ];
  for (let i = 0; i < this. operationsFiltered.length; i++) {
    const operations = this. operationsFiltered[i];
    
    const row = [
     operations.description_operation,
      operations.date_de_creation,
      operations.date_mise_a_jour,
      
      
    ];
    rows.push(row);
  }



  // Créer une feuille à partir des données filtrées (à partir du tableau de lignes)l'aide de la méthode "XLSX.utils.aoa_to_sheet()
  // Une feuille de calcul est une grille de cellules dans un classeur Excel dans laquelle vous pouvez entrer des données
  const worksheet = XLSX.utils.aoa_to_sheet(rows);



  // La feuille de calcul est ajoutée au classeur Excel à l'aide de la méthode "XLSX.utils.book_append_sheet()
  //Cette méthode prend trois arguments : le classeur Excel, la feuille de calcul, et le nom de la feuille.
  XLSX.utils.book_append_sheet(workbook, worksheet, 'operations');



  //  Enfin, le classeur Excel est écrit dans un fichier et téléchargé sur l'ordinateur de l'utilisateur à l'aide de la méthode "XLSX.writeFile()".
  // Cette méthode prend deux arguments : le classeur Excel + le nom du fichier Excel à écrire.
  
  XLSX.writeFile(workbook, 'operations.xlsx');
} 
}

