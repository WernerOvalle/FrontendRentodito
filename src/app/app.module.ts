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

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    RegisterComponent,
    ErrorComponent,
    HelpComponent,
    UserEditComponent
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
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
