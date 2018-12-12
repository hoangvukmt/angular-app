import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {
  MatDatepickerModule
  , MatNativeDateModule
  , MatFormFieldModule
  , MatInputModule
  , MatSelectModule
  , MAT_DATE_LOCALE
  , MatDialogModule
  , DateAdapter
  , MAT_DATE_FORMATS
  , MatAutocompleteModule
} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {WebcamModule} from 'ngx-webcam';
import { HttpIntercepter } from './core/intercepter/http-intercepter';
import { CoreModule } from './core/core.module';
import { authGuard } from './core/common/authGuard';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegisterCpnComponent } from './components/register-cpn/register-cpn.component';
import { LoginCpnComponent } from './components/login-cpn/login-cpn.component';
import { ForgetPassCpnComponent } from './components/forget-pass-cpn/forget-pass-cpn.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { FamilyInfoComponent } from './components/family-info/family-info.component';
import { InsuranceTypeComponent } from './components/insurance-type/insurance-type.component';
import { InsuranceInfoComponent } from './components/insurance-info/insurance-info.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { InsuranceContractComponent } from './components/insurance-contract/insurance-contract.component';
import { HeaderCpnComponent } from './components/header-cpn/header-cpn.component';
import { FooterCpnComponent } from './components/footer-cpn/footer-cpn.component';
import { UploadCpnComponent } from './components/upload-cpn/upload-cpn.component';
import { PaymentBoxComponent } from './components/payment-box/payment-box.component';
import { SelectFamilyComponent } from './components/popup/select-family/select-family.component';
import { InsuranceInfoEditComponent } from './components/insurance-info-edit/insurance-info-edit.component';
import { SelectItemCommonComponent } from './components/popup/select-item-common/select-item-common.component';
import { AddAgencyComponent } from './components/popup/add-agency/add-agency.component';
import { AddInsuranceCompanyComponent } from './components/popup/add-insurance-company/add-insurance-company.component';
import { AddTextComponent } from './components/popup/add-text/add-text.component';
import { AddInsuranceTypeComponent } from './components/popup/add-insurance-type/add-insurance-type.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SettingCpnComponent } from './components/setting-cpn/setting-cpn.component';
import { AnalyzerComponent } from './components/analyzer/analyzer.component';
import { FamilyListComponent } from './components/family-list/family-list.component';
import { ConfirmCommonComponent } from './components/popup/confirm-common/confirm-common.component';
import { AnalyzerConfirmComponent } from './components/popup/analyzer-confirm/analyzer-confirm.component';
import { ShoukenListComponent } from './components/shouken-list/shouken-list.component';
import { ShoukenApplyComponent } from './components/shouken-apply/shouken-apply.component';
import { ShoukenApplyCompleteComponent } from './components/shouken-apply-complete/shouken-apply-complete.component';
import { AgencyListComponent } from './components/agency-list/agency-list.component';
import { AgencyInfoComponent } from './components/agency-info/agency-info.component';
import { AgencyInfoEditComponent } from './components/agency-info-edit/agency-info-edit.component';
import { SettingInfoCpnComponent } from './components/setting-info-cpn/setting-info-cpn.component';
import { MessageSendComponent } from './components/message-send/message-send.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ViewAgencyInfoComponent } from './components/view-agency-info/view-agency-info.component';
import { ViewInsuranceInfoComponent } from './components/view-insurance-info/view-insurance-info.component';
import { SelectImgComponent } from './components/shouken-list/select-img/select-img.component';
import { AddStockConfirmComponent } from './components/shouken-list/add-stock-confirm/add-stock-confirm.component';
import { ShoukenDetailComponent } from './components/shouken-list/shouken-detail/shouken-detail.component';
import { GlobalsHome } from './core/service/global-variables';
import { OnlyNumber } from './core/common/onlyNumber.directive';
import { BannerComponent } from './components/banner/banner.component';
import {TouchEventModule} from 'ng2-events/lib/touch';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AlertCommonComponent } from './components/popup/alert-common/alert-common.component';
import { KeiyakuFieldComponent } from './components/popup/keiyaku-field/keiyaku-field.component';
import { YearMonthComponent } from './components/popup/year-month/year-month.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterCpnComponent,
    LoginCpnComponent,
    ForgetPassCpnComponent,
    PersonalInfoComponent,
    FamilyInfoComponent,
    InsuranceTypeComponent,
    InsuranceInfoComponent,
    HomePageComponent,
    InsuranceContractComponent,
    HeaderCpnComponent,
    FooterCpnComponent,
    UploadCpnComponent,
    AddStockConfirmComponent,
    SelectImgComponent,
    PaymentBoxComponent,
    SelectFamilyComponent,
    InsuranceInfoEditComponent,
    SelectItemCommonComponent,
    AddAgencyComponent,
    AddInsuranceCompanyComponent,
    ShoukenDetailComponent,
    AddTextComponent,
    AddInsuranceTypeComponent,
    ChangePasswordComponent,
    SettingCpnComponent,
    AnalyzerComponent,
    FamilyListComponent,
    ConfirmCommonComponent,
    AnalyzerConfirmComponent,
    ShoukenListComponent,
    ShoukenApplyComponent,
    ShoukenApplyCompleteComponent,
    AgencyListComponent,
    AgencyInfoComponent,
    AgencyInfoEditComponent,
    SettingInfoCpnComponent,
    MessageSendComponent,
    MessageListComponent,
    ViewAgencyInfoComponent,
    ViewInsuranceInfoComponent,
    PageNotFoundComponent,
    OnlyNumber,
    BannerComponent,
    AlertCommonComponent,
    KeiyakuFieldComponent,
    YearMonthComponent
  ],
  exports: [TouchEventModule],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    AppRoutingModule,
    TouchEventModule,
    CoreModule,
    WebcamModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  providers: [
    authGuard,
    GlobalsHome,
    { provide: HTTP_INTERCEPTORS, useClass: HttpIntercepter, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddStockConfirmComponent
    , SelectImgComponent
    , SelectFamilyComponent
    , SelectItemCommonComponent
    , AddAgencyComponent
    , AddInsuranceCompanyComponent
    , AddTextComponent
    , AddInsuranceTypeComponent
    , ConfirmCommonComponent
    , AnalyzerConfirmComponent
    , AlertCommonComponent
  ]
})
export class AppModule {

}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
