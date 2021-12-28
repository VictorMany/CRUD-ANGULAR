import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NewsApp';

  constructor(private router: Router) { }

  cambio() {
    this.router.navigate(['news/today']);
  }

  addNota() {
    this.router.navigate(['/news/new']);
  }

  home() {
    this.router.navigate(['/news']);
  }
}
