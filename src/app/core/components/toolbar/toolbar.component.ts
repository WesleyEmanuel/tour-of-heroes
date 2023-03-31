import { Component, Input } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private router: Router) {}

  @Input() title = '';
  @Input() menuItems: MenuItem[] = [];

  navigateTo(routerLink: string): void {
    this.router.navigate([routerLink]);
  }
}
