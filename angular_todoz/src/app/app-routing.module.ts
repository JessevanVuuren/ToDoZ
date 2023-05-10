import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService, canActivate, canActivateChild } from 'src/services/auth.service';
import { LoginComponent } from './login/login.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  
  { path: "todoz", component: TodosComponent, canActivate:[canActivate] },

  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
