import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, CommonModule, RouterLinkWithHref],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  constructor(private router: Router, private auth: AuthService) {

  }
  ngOnInit(): void {
    this.auth.isLoggedIn().add(() => {
      if (!this.auth.isLogged()) this.router.navigate(['login']);
    });
  }

  isRoute(route: string) {
    return window.location.pathname.includes(route)
  }
  navigate(route: string) {
    this.router.navigate([route])
  }

}
