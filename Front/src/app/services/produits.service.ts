import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  private url="http://localhost:3000/api/"
  constructor(private http:HttpClient) { }
 
 
  getAll(page: number): Observable<any> {
    return this.http.get(this.url + 'allproduits', { params: { page: page.toString() } });
  }
  getbynumserie (num_serie:string){
    return this.http.get(this.url +'bynumserie/' + num_serie);
 }


 
 create(produit:any){
  return this.http.post(this.url +'addproduit', {produit});

 }
 


 delete(num_serie:string){
  return this.http.delete(this.url + 'deleteproduit/' + num_serie) ;
}

update(num_serie:String , produit:any){
  return this.http.put(this.url + 'updateproduit/'+ num_serie ,produit );
}



checkProduit(num_serie: string): Observable<{ exists: boolean }> {
  return this.http.get<{ exists: boolean }>(`${this.url}checkproduit/${num_serie}`);
}
}





 
  






 
  





  











 

 





 

 



  











 

 





 

 
