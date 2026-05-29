import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  data: any;

  constructor(
    private activeRoute: ActivatedRoute, 
    private router: Router
  ) {
    this.activeRoute.queryParams.subscribe(params => {
      if(this.router.currentNavigation()?.extras.state) {
        this.data = this.router.currentNavigation()?.extras?.state?.['user'];
        console.log(this.data);
      }
      else {
        this.router.navigate(["/login"]);
      }
    });
  }
}
