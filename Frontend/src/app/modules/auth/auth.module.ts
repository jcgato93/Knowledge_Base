import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountsService } from './services/accounts.service';




@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule    
  ],
  providers:[
    AccountsService
  ]
})
export class AuthModule { }
