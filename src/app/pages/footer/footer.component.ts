import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})
export class FooterComponent {
  private user: any;
  constructor ()
  {

  }

  logout()
  {
    // if(this.user)
    // {
    //   this.localStorageService.remove('user');
    //   this.user = null;
    // }
  }

}
