import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Hero } from '../models/hero.model';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private apiUrl: string = `${environment.baseUrl}/heroes`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl).pipe(
      tap((heroes) => {
        this.log(`fetched ${heroes.length} heroes`);
      })
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`).pipe(
      tap((hero) => {
        this.log(hero.name + ' selected');
      })
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http
      .put<Hero>(`${this.apiUrl}/${hero.id}`, hero)
      .pipe(tap((hero) => this.log(hero.name + ' successfully updated')));
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.apiUrl, hero)
      .pipe(
        tap((hero) =>
          this.messageService.add(
            `HeroService: ${hero.name} successfully created`
          )
        )
      );
  }

  deleteHero(hero: Hero): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${hero.id}`).pipe(
      tap(() => {
        this.messageService.add(
          `HeroService: ${hero.name} successfully deleted`
        );
      })
    );
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
}
