import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLogComponent } from './add-log/add-log.component';
import { FilterLogComponent } from './filter-log/filter-log.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'addlog', component: AddLogComponent },
  { path: 'filterlog', component: FilterLogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
