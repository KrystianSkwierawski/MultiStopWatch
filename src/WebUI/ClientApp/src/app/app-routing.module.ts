import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { ProjectDetailsComponent } from './application/project-items/project-details/project-details.component';
import { ProjectsListComponent } from './application/project-items/projects-list/projects-list.component';
import { AuthorizeGuard } from './authentication/authorize.guard';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'app', component: ApplicationComponent, canActivate: [AuthorizeGuard], children: [
      { path: '', component: ProjectsListComponent, canActivate: [AuthorizeGuard] },
      { path: 'project/:id', component: ProjectDetailsComponent, canActivate: [AuthorizeGuard] },
      { path: '**', redirectTo: 'projects' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
