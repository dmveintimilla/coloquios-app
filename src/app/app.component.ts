import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication-service';
// import { NotificationsService } from './services/notifications.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  admin = false;

  constructor( public authService: AuthenticationService,
    private platform: Platform,
    
   

  ) {}
  

  ngOnInit(){
    this.getUid();
    this.initializeApp();

  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      this.getUid();
    });
}


  getUid() {
    this.authService.stateAuth().subscribe( res => {
          if (res !== null) {
              if (res.uid === 'BcnumCnco--2')  {
                  this.admin = true;
              } else {
                 this.admin = false;
              }
          } else {
            this.admin = false;
          }
    });
}
}
