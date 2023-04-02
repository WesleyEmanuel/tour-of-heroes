import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { PageNotFoundComponent } from '../core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
  },
  {
    path: ':id',
    component: HeroDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
