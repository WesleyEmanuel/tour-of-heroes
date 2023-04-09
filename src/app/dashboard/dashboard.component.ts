import { Component, OnInit } from '@angular/core';
import { Hero } from '../core/models/hero.model';
import { HeroService } from '../core/services/hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private router: Router) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      (heroes) => (this.heroes = heroes.slice(0, 5)),
      (error) => console.log(error)
    );
  }

  onSelected(hero: Hero): void {
    this.router.navigate(['/heroes', hero.id]);
  }
}
