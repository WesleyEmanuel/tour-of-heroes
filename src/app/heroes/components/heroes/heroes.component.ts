import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from 'src/app/core/models/dialog-data.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      (heroes) => (this.heroes = heroes),
      (error) => console.error(error)
    );
  }

  deleteHero(hero: Hero): void {
    const dialogData: DialogData = {
      cancelText: 'cancel',
      confirmText: 'Delete',
      content: `Delete ${hero.name}?`,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.heroService.deleteHero(hero).subscribe(() => this.getHeroes());
      }
    });
  }

  onSelected(hero: Hero): void {
    this.deleteHero(hero);
  }
}
