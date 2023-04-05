import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero;
  isEditing!: boolean;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId == 'new') {
      this.isEditing = false;
      this.hero = {
        name: '',
      } as Hero;
    } else {
      this.isEditing = true;
      const id = Number(paramId);
      this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
    }
  }

  goBack() {
    this.location.back();
  }

  isEmptyForm(): boolean {
    return !this.hero.name.trim();
  }

  saveHero(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

  createHero(): void {
    this.heroService.createHero(this.hero).subscribe(() => this.goBack());
  }
}
