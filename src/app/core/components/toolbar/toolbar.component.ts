import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private router: Router) {}

  @Input() isLoggedIn: boolean | null = null;
  @Input() title = '';
  @Input() menuItems: MenuItem[] = [];

  @Output() private logout = new EventEmitter();

  navigateTo(routerLink: string): void {
    this.router.navigate([routerLink]);
  }

  onLogout(): void {
    this.logout.emit();
  }
}
