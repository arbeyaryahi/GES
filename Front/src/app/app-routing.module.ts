import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigurationComponent } from './dashboard/configuration/configuration.component';
import { OperationmanagementComponent } from './dashboard/configuration/operationmanagement/operationmanagement.component';
import { ListoperationsComponent } from './dashboard/configuration/operationmanagement/listoperations/listoperations.component';
import { AjoutoperationsComponent } from './dashboard/configuration/operationmanagement/ajoutoperations/ajoutoperations.component';
import { UpdateoperationsComponent } from './dashboard/configuration/operationmanagement/updateoperations/updateoperations.component';





const routes: Routes = [
  {path:'', redirectTo:'/dashboard/configuration', pathMatch:'full'},
  {path:'dashboard', component:DashboardComponent,  children:[
    {path:'configuration',  component:ConfigurationComponent,children:[

      {path:'operations',  component:OperationmanagementComponent,children:[
        {path:'',redirectTo:'listoperations',pathMatch:'full'},
        {path:'listoperations',component:ListoperationsComponent},
        {path:'ajoutoperations',component:AjoutoperationsComponent},
        { path: 'updateoperation/:description_operation', component: UpdateoperationsComponent}]}

 

  ]},
   

  
  ],
      }
     
  
    
  
 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
