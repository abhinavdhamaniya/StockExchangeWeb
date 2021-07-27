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
import { ImportDataComponent } from './import-excel/import-data/import-data.component';
import { UpdateUserProfileComponent } from './update-user-profile/update-user-profile.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { SingleCompanyComponent } from './comparison-charts/single-company/single-company.component';
import { DifferentCompaniesComponent } from './comparison-charts/different-companies/different-companies.component';
import { ChartsModule } from 'ng2-charts';
import { GetCompanyByIdComponent } from './manage-company/get-company-by-id/get-company-by-id.component';
import { GetCompanyByNameComponent } from './manage-company/get-company-by-name/get-company-by-name.component';
import { UnauthanticatedComponent } from './shared/unauthanticated/unauthanticated.component';

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
    UpdateIpoComponent,
    ImportDataComponent,
    UpdateUserProfileComponent,
    AdminLoginComponent,
    UserLoginComponent,
    UserSignupComponent,
    SingleCompanyComponent,
    DifferentCompaniesComponent,
    GetCompanyByIdComponent,
    GetCompanyByNameComponent,
    UnauthanticatedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'admin/get-all-companies', component: GetAllCompaniesComponent },
      { path: 'admin/create-company', component: CreateCompanyComponent },
      { path: 'admin/deactivate-company', component: DeactivateCompanyComponent },
      { path: 'admin/update-company', component: UpdateCompanyComponent },
      { path: 'admin/get-all-exchanges', component: GetAllExchangesComponent },
      { path: 'admin/create-exchange', component: CreateExchangeComponent },
      { path: 'admin/get-all-ipos', component: GetAllIposComponent },
      { path: 'admin/create-ipo', component: CreateIpoComponent },
      { path: 'admin/update-ipo', component: UpdateIpoComponent },
      { path: 'admin/import-data', component: ImportDataComponent },
      { path: 'user/update-user-profile', component: UpdateUserProfileComponent },
      { path: 'admin-login', component: AdminLoginComponent },
      { path: 'user-login', component: UserLoginComponent },
      { path: 'user-signup', component: UserSignupComponent },
      { path: 'single-company', component: SingleCompanyComponent },
      { path: 'different-companies', component: DifferentCompaniesComponent },
      { path: 'get-company-by-id', component: GetCompanyByIdComponent },
      { path: 'get-company-by-name', component: GetCompanyByNameComponent },
      { path: 'unauthanticated', component: UnauthanticatedComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
