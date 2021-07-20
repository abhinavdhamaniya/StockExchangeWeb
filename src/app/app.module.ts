import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportDataComponent } from './import-data/import-data.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ManageExchangeComponent } from './manage-exchange/manage-exchange.component';
import { UpdateIpoComponent } from './update-ipo/update-ipo.component';
import { GetAllCompaniesComponent } from './company/get-all-companies/get-all-companies.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateCompanyComponent } from './company/create-company/create-company.component';
import { FormsModule } from '@angular/forms';
import { DeactivateCompanyComponent } from './company/deactivate-company/deactivate-company.component';
import { UpdateCompanyComponent } from './company/update-company/update-company.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ImportDataComponent,
    ManageExchangeComponent,
    UpdateIpoComponent,
    GetAllCompaniesComponent,
    CreateCompanyComponent,
    DeactivateCompanyComponent,
    UpdateCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'admin/welcome', component: WelcomeComponent },
      { path: 'admin/import-data', component: ImportDataComponent },
      { path: 'admin/get-all-companies', component: GetAllCompaniesComponent },
      { path: 'admin/create-company', component: CreateCompanyComponent },
      { path: 'admin/deactivate-company', component: DeactivateCompanyComponent },
      { path: 'admin/update-company', component: UpdateCompanyComponent },
      { path: 'admin/manage-exchange', component: ManageExchangeComponent },
      { path: 'admin/update-ipo', component: UpdateIpoComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
