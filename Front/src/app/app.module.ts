import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './dashboard/layout/layout.component';

import { SidebarComponent } from './dashboard/layout/sidebar/sidebar.component';
import { ConfigurationComponent } from './dashboard/configuration/configuration.component';
import { OperationmanagementComponent } from './dashboard/configuration/operationmanagement/operationmanagement.component';

import { ListoperationsComponent } from './dashboard/configuration/operationmanagement/listoperations/listoperations.component';
import { AjoutoperationsComponent } from './dashboard/configuration/operationmanagement/ajoutoperations/ajoutoperations.component';
import { UpdateoperationsComponent } from './dashboard/configuration/operationmanagement/updateoperations/updateoperations.component';






@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LayoutComponent,
    ConfigurationComponent,
    OperationmanagementComponent,
   
    ListoperationsComponent,
    AjoutoperationsComponent,
    UpdateoperationsComponent,
    SidebarComponent,
   
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  
   HttpClientModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
