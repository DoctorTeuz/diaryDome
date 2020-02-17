import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './diaryDome/homepage/homepage.component';
import { WorkerCompleteListComponent } from './WWEATeuz_History/worker-complete-list/worker-complete-list.component';
import { AlboComponent } from './WWEATeuz_History/albo/albo.component';
import { LoginComponent } from './shared/login/login.component';
import { ShowListComponent } from './diaryDome/show-list/show-list.component';
import { ShowComponent } from './diaryDome/show/show.component';


const routes: Routes = [
  {path:'', redirectTo:'Homepage', pathMatch:'full'},
  {path:'Homepage', component: HomepageComponent},
  {path:'workerCompleteList', component: WorkerCompleteListComponent},
  {path:'albo', component: AlboComponent},
  {path:'login', component: LoginComponent},
  {path:'showList', component: ShowListComponent},
  {path:'show', component: ShowComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
