import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  hero!: Hero;
  isEditing = false;

  form = this.fb.group({
    id: [{ value: '', disabled: true }],
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId != 'new') {
      this.isEditing = true;
      const id = Number(paramId);
      this.heroService.getHero(id).subscribe((hero) => {
        this.hero = hero;

        this.form.controls['id'].setValue(hero.id.toString());
        this.form.controls['name'].setValue(hero.name);
      });
    }
  }

  goBack() {
    this.location.back();
  }

  saveHero(): void {
    const { valid, value } = this.form;

    if (valid) {
      const hero: Hero = {
        id: this.hero.id,
        name: value.name || '',
      };
      this.heroService.updateHero(hero).subscribe(() => this.goBack());
    } else {
      this.openSnackBar('Please check the errors found.');
    }
  }

  createHero(): void {
    const { valid, value } = this.form;

    if (valid) {
      const hero: Hero = {
        name: value.name || '',
      } as Hero;
      this.heroService.createHero(hero).subscribe(() => this.goBack());
    } else {
      this.openSnackBar('Please check the errors found.');
    }
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
