import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/*imports*/
import { RouterModule,  } from '@angular/router';
import {routing,appRoutingProviders} from './app.routing';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';


/*componentes*/
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { HelpComponent } from './components/help/help.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { Help2Component } from './components/help2/help2.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { Help1Component } from './components/help1/help1.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { Help3Component } from './components/help3/help3.component';
import { Help4Component } from './components/help4/help4.component';
import { Help5Component } from './components/help5/help5.component';
import { Help6Component } from './components/help6/help6.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { TiendasNewComponent } from './components/tiendas-new/tiendas-new.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { CrearArticulosComponent } from './components/crear-articulos/crear-articulos.component';
import { ServiciosNewComponent } from './components/servicios-new/servicios-new.component';
import { TiendasDetailComponent } from './components/tiendas-detail/tiendas-detail.component';
import { ParticularesServiciosComponent } from './components/particulares-servicios/particulares-servicios.component';
import { ParticularesProductosComponent } from './components/particulares-productos/particulares-productos.component';
import { ListadoBusquedaComponent } from './components/listado-busqueda/listado-busqueda.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    RegisterComponent,
    ErrorComponent,
    HelpComponent,
    UserEditComponent,
    Help2Component,
    ArticulosComponent,
    Help1Component,
    TiendasComponent,
    Help3Component,
    Help4Component,
    Help5Component,
    Help6Component,
    CategoryNewComponent,
    TiendasNewComponent,
    UserNewComponent,
    CrearArticulosComponent,
    ServiciosNewComponent,
    TiendasDetailComponent,
    ParticularesServiciosComponent,
    ParticularesProductosComponent,
    ListadoBusquedaComponent,


  ],
  imports: [
    BrowserModule,
    //imports
    RouterModule,
    routing,
    FormsModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot() , AngularFileUploaderModule,
  ],
  providers: [
    appRoutingProviders,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
