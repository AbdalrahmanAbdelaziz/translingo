import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }

  navigateToTranslate() {
    this.router.navigate(['/translate']);
  }

  navigateToTest() {
    this.router.navigate(['/test']);
  }

  navigateToAddWord() {
    this.router.navigate(['/add-word']);
  }

  navigateToDictionary(){
    this.router.navigate(['/dictionary'])
  }
}
