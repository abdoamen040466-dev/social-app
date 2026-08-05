import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { AuthStorageService } from '../../../core/auth/services/auth-storage.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isMenuOpened: boolean = false;
  isAvatarOpened: boolean = false;
  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('avatar') avatar!: ElementRef;

  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    // console.log(event.target);
    // console.log(this.menu.nativeElement);
    // console.log(this.avatar.nativeElement);

    const target = event.target as Node;
    // console.log(this.menu.nativeElement.contains(target));
    // console.log(this.avatar.nativeElement.contains(target));

    if (this.menu.nativeElement.contains(target)) {
      this.isMenuOpened = !this.isMenuOpened;
      this.isAvatarOpened = false;
    } else if (this.avatar.nativeElement.contains(target)) {
      this.isAvatarOpened = !this.isAvatarOpened;
      this.isMenuOpened = false;
    } else {
      this.isMenuOpened = false;
      this.isAvatarOpened = false;
    }
  }

  signOut(): void {
    this.authService.signout();
    this.router.navigate(['/login']);
  }
}
