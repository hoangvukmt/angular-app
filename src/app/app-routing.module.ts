import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterCpnComponent } from './components/register-cpn/register-cpn.component';
import { LoginCpnComponent } from './components/login-cpn/login-cpn.component';
import { ForgetPassCpnComponent } from './components/forget-pass-cpn/forget-pass-cpn.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { FamilyListComponent } from './components/family-list/family-list.component';
import { FamilyInfoComponent } from './components/family-info/family-info.component';
import { ShoukenApplyComponent } from './components/shouken-apply/shouken-apply.component';
import { UploadCpnComponent } from './components/upload-cpn/upload-cpn.component';
import { ShoukenListComponent } from './components/shouken-list/shouken-list.component';
import { ShoukenApplyCompleteComponent } from './components/shouken-apply-complete/shouken-apply-complete.component';
import { InsuranceTypeComponent } from './components/insurance-type/insurance-type.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { InsuranceContractComponent } from './components/insurance-contract/insurance-contract.component';
import { InsuranceInfoComponent } from './components/insurance-info/insurance-info.component';
import { InsuranceInfoEditComponent } from './components/insurance-info-edit/insurance-info-edit.component';
import { SettingCpnComponent } from './components/setting-cpn/setting-cpn.component';
import { SettingInfoCpnComponent } from './components/setting-info-cpn/setting-info-cpn.component';
import { AnalyzerComponent } from './components/analyzer/analyzer.component';
import { AgencyListComponent } from './components/agency-list/agency-list.component';
import { AgencyInfoComponent } from './components/agency-info/agency-info.component';
import { AgencyInfoEditComponent } from './components/agency-info-edit/agency-info-edit.component';
import { MessageSendComponent } from './components/message-send/message-send.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ViewAgencyInfoComponent } from './components/view-agency-info/view-agency-info.component';
import { ViewInsuranceInfoComponent } from './components/view-insurance-info/view-insurance-info.component';

import { ROUTER_URL } from './core/const';
import { authGuard } from './core/common/authGuard';
import { ShoukenDetailComponent } from './components/shouken-list/shouken-detail/shouken-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo: ROUTER_URL.login, pathMatch: 'full' },
    { path: ROUTER_URL.register, component: RegisterCpnComponent },
    { path: ROUTER_URL.login, component: LoginCpnComponent},
    { path: ROUTER_URL.forgetPass, component: ForgetPassCpnComponent },
    { path: ROUTER_URL.changePass, component: ChangePasswordComponent, data: { display: true }, canActivate: [authGuard] },
    { path: ROUTER_URL.changePassWord, component: ChangePasswordComponent, data: { display: false }, canActivate: [authGuard] },
    { path: ROUTER_URL.personalInfo, component: PersonalInfoComponent, data: { display: true }, canActivate: [authGuard] },
    { path: ROUTER_URL.personalInfoSetting, component: PersonalInfoComponent, data: { display: false }, canActivate: [authGuard] },
    { path: ROUTER_URL.familyList, component: FamilyListComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.familyInfo, component: FamilyInfoComponent, data: { display: true, canActivate: [authGuard] } },
    { path: ROUTER_URL.familyInfoSetting + '/:id', component: FamilyInfoComponent, data: { display: false }, canActivate: [authGuard] },
    { path: ROUTER_URL.startApply, component: ShoukenApplyComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.home, component: HomePageComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.upload, component: UploadCpnComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.shoukenList + '/:id' + '/:status', component: ShoukenListComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.shoukenApplyComplete, component: ShoukenApplyCompleteComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.insuranceType, component: InsuranceTypeComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.insuranceInfo + '/:id', component: InsuranceInfoComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.insuranceInfoEdit + '/:id', component: InsuranceInfoEditComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.insuranceContract + '/:id', component: InsuranceContractComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.setting, component: SettingCpnComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.settingInfo + '/:id', component: SettingInfoCpnComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.analyzer, component: AnalyzerComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.agencyList, component: AgencyListComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.agencyInfo + '/:id', component: AgencyInfoComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.agencyInfoEdit + '/:id', component: AgencyInfoEditComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.messageSend, component: MessageSendComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.messageList, component: MessageListComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.viewAgencyInfo + '/:id', component: ViewAgencyInfoComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.viewInsuranceInfo + '/:id', component: ViewInsuranceInfoComponent, canActivate: [authGuard] },
    { path: ROUTER_URL.shoukenDetail + '/:id1' + '/:id2' + '/:status', component: ShoukenDetailComponent, canActivate: [authGuard] },
    // otherwise redirect to login
    { path: '**', component: PageNotFoundComponent, canActivate: [authGuard] }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
