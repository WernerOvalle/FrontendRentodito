//imports necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ErrorComponent } from './components/error/error.component';
import { HelpComponent } from './components/help/help.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
//definir ruts
const appRoutes: Routes = [
  { path: 'inicio', component: PrincipalComponent },
  { path: '', component: PrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'help', component: HelpComponent },
  { path: 'logout/:sure', component: LoginComponent },
  { path: 'ajustes', component: UserEditComponent },
  { path: '**', component: ErrorComponent },
];

//exportar config
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(
  appRoutes, { anchorScrolling: 'enabled'
}
);
