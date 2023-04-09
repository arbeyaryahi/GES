
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private url="http://localhost:3000/api/"
  constructor(private http:HttpClient) { }
 
  getAll(page: number): Observable<any> {
    return this.http.get(this.url + 'alloperations', { params: { page: page.toString() } });
  }
  getbydescriptionOperation(description_operation:string){
    return this.http.get(this.url +'bydescription/' + description_operation);
 }
 
 
 create(description_operation: any) {
  return this.http.post(this.url + 'addoperation', { description_operation });
}

 delete(description_operation:String){
  return this.http.delete(this.url + 'deleteoperation/' + description_operation) ;
}

update(description_operation:String , operation:any){
  return this.http.put(this.url + 'updateoperation/'+ description_operation ,operation );
}

checkOperation(description_operation: string): Observable<{ exists: boolean }> {
  return this.http.get<{ exists: boolean }>(`${this.url}checkoperation/${description_operation}`);
}

  
}


 
  





  











 

 





 

 
