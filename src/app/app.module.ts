import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GetAllCompaniesComponent } from './manage-company/get-all-companies/get-all-companies.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateCompanyComponent } from './manage-company/create-company/create-company.component';
import { FormsModule } from '@angular/forms';
import { DeactivateCompanyComponent } from './manage-company/deactivate-company/deactivate-company.component';
import { UpdateCompanyComponent } from './manage-company/update-company/update-company.component';
import { GetAllExchangesComponent } from './manage-exchange/get-all-exchanges/get-all-exchanges.component';
import { CreateExchangeComponent } from './manage-exchange/create-exchange/create-exchange.component';
import { GetAllIposComponent } from './manage-ipo/get-all-ipos/get-all-ipos.component';
import { CreateIpoComponent } from './manage-ipo/create-ipo/create-ipo.component';
import { UpdateIpoComponent } from './manage-ipo/update-ipo/update-ipo.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    GetAllCompaniesComponent,
    CreateCompanyComponent,
    DeactivateCompanyComponent,
    UpdateCompanyComponent,
    GetAllExchangesComponent,
    CreateExchangeComponent,
    GetAllIposComponent,
    CreateIpoComponent,
    UpdateIpoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'admin/welcome', component: WelcomeComponent },
      { path: 'admin/get-all-companies', component: GetAllCompaniesComponent },
      { path: 'admin/create-company', component: CreateCompanyComponent },
      { path: 'admin/deactivate-company', component: DeactivateCompanyComponent },
      { path: 'admin/update-company', component: UpdateCompanyComponent },
      { path: 'admin/get-all-exchanges', component: GetAllExchangesComponent },
      { path: 'admin/create-exchange', component: CreateExchangeComponent },
      { path: 'admin/get-all-ipos', component: GetAllIposComponent },
      { path: 'admin/create-ipo', component: CreateIpoComponent },
      { path: 'admin/update-ipo', component: UpdateIpoComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
