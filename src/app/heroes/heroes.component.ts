import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Wescleyson',
  };
  constructor() {}

  setHeroe(hero: Hero): void {
    this.hero = hero;
  }

  ngOnInit(): void {}
}
