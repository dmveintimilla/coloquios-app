import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Estudiante } from '../../../app/models/estudiante';
import { User } from '../../../app/models/user';
import { AuthenticationService } from '../../../app/services/authentication-service';
import { DataLocalService } from '../../../app/services/data-local.service';
import { FirestoreService } from '../../../app/services/firestore.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  admin = false;

  public codeQR: string;

  user: User = {
    uid: '',
    email: '',
    emailVerified: null ,
  }

  estudiante: Estudiante = {
    uid: "",
    id: "",
    nombre: '',
    apellido: '',
    email: '',
  }

  suscriberUserInfo: Subscription;
  suscriberEstudInfo: Subscription;
  uid = '';

  constructor( public dataLocal: DataLocalService,
               public authService: AuthenticationService,
               public firestoreService: FirestoreService ) {
    

    this.authService.stateAuth().subscribe( res =>{
      console.log(res);
      if (res !== null){
        this.uid = res.uid;
        this.getUserInfo(this.uid);
        this.getEstudInfo(this.uid);
        if(this.uid==='BcnumCnco--2'){
          this.admin = true;
          console.log('Si es admin, ocultar boton');
              } else {
                 this.admin = false;
              }
        console.log(this.uid);
        // this.codeQR = this.uid;
      } else {
        console.log('Error');
       

      }
    });

    
  
  }

  async ngOnInit() {
    const uid = await this.authService.getUid();
    console.log(uid);

    
  }

  // enviarCorreo() {
  //   this.dataLocal.enviarCorreo();
  // }

  abrirRegistro( registro ) {
    console.log('Registro', registro );
    this.dataLocal.abrirRegistro( registro );
  }

  getUserInfo(uid: string) {
    console.log('getUserInfo');
    const path = 'Users';
    this.suscriberUserInfo = this.firestoreService.getDoc<User>(path, uid).subscribe( res => {
           if (res !== undefined) {
             this.user = res;
           }
    });
  }

  getEstudInfo(uid: string) {
    console.log('getEstudianteInfo');
    const path = 'Estudiantes';
    this.suscriberEstudInfo = this.firestoreService.getDoc<Estudiante>(path, uid).subscribe(res => {
      console.log(res);
      if (res !== undefined) {
        this.estudiante = res;
        console.log(res);
      }
           
    });
  }

}
