import { Component, Injector } from '@angular/core';

// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Subscription } from 'rxjs';
import { Coloquio } from '../../../app/models/coloquio';
import { Estudiante } from '../../../app/models/estudiante';
import { User } from '../../../app/models/user';
import { AsistenciaService } from '../../../app/services/asistencia.service';
import { AuthenticationService } from '../../../app/services/authentication-service';
import { DataLocalService } from '../../../app/services/data-local.service';
import { FirestoreService } from '../../../app/services/firestore.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public codeQR: string;

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

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

  private path = 'Coloquios/'
  coloquios: Coloquio[] = [];

  datosAsistEst : string;

  constructor(
               public firestoreService: FirestoreService,
               public authService: AuthenticationService,
               public asistenciaService: AsistenciaService,
               private injector: Injector
               ) {
                this.authService.stateAuth().subscribe( res =>{
                  console.log(res);
                  if (res !== null){
                    this.uid = res.uid;
                    this.getUserInfo(this.uid);
                    this.getEstudInfo(this.uid);
                    console.log(this.uid);
                  } else {
                    console.log('Error');
                  }
                });

               }

               
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit(){
    this.getColoquios();
  }

  getColoquios(){
    //Observable. Nos suscribimos a este obsavable para ver todos los datos de la colleccion
    this.firestoreService.getCollection<Coloquio>(this.path).subscribe( res =>{
      this.coloquios = res;
      console.log(res);

    });
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
        this.datosAsistEst = res.uid;
        console.log(res);
      }
           
    });
  }

  addAsistEstud(coloquio: Coloquio){
    this.codeQR = this.datosAsistEst+'|'+coloquio.id;
    
  }

  

  filterEventByType(type: string) {
    return this.coloquios.filter(e => e.estado === type);

  }


}
