//imports necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ErrorComponent } from './components/error/error.component';
import { HelpComponent } from './components/help/help.component'
import { Help1Component } from './components/help1/help1.component'
import { Help2Component } from './components/help2/help2.component'
import { Help3Component } from './components/help3/help3.component'
import { Help4Component } from './components/help4/help4.component'
import { Help5Component } from './components/help5/help5.component'
import { Help6Component } from './components/help6/help6.component'
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ArticulosComponent } from './components/articulos/articulos.component'
import { TiendasComponent } from './components/tiendas/tiendas.component'
//definir ruts
const appRoutes: Routes = [
  { path: 'inicio', component: PrincipalComponent },
  { path: '', component: PrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'help', component: HelpComponent },
  { path: 'help1', component: Help1Component },
  { path: 'help2', component: Help2Component },
  { path: 'help3', component: Help3Component },
  { path: 'help4', component: Help4Component },
  { path: 'help5', component: Help5Component },
  { path: 'help6', component: Help6Component },
  { path: 'logout/:sure', component: LoginComponent },
  { path: 'ajustes', component: UserEditComponent },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'tiendas', component: TiendasComponent },
  { path: '**', component: ErrorComponent },
];

//exportar config
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(
  appRoutes, { anchorScrolling: 'enabled'
}
);
