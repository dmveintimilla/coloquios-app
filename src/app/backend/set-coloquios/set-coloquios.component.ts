import { Component, OnInit } from '@angular/core';
// import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Coloquio } from '../../../app/models/coloquio';
import { DataLocalService } from '../../../app/services/data-local.service';
import { FirestoreService } from '../../../app/services/firestore.service';
import { HttpClient } from "@angular/common/http";
import { AsistenciaService } from '../../../app/services/asistencia.service';

import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-set-coloquios',
  templateUrl: './set-coloquios.component.html',
  styleUrls: ['./set-coloquios.component.scss'],
})
export class SetColoquiosComponent implements OnInit {

  private path = 'Coloquios/'
  coloquios: Coloquio[] = [];

  newColoquio: Coloquio = {
    nombre: '',
    nameD2L: '',
    lugar: '',
    cantidad: null,
    fecha: null,
    id: this.firestoreService.getId(),
    estado: 'proximo',
  };

  enableNewColoquio = false;

  enableViewColoquio = true;

  enableViewRegister = false;


  loading: any;

  scanActive: boolean = false;

  valorString: string;
  

  public userArray: UserD2L[] = [];
  row : any;

  constructor(
    private asistenciaService: AsistenciaService,
    private dataLocal: DataLocalService,
    public firestoreService: FirestoreService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private http: HttpClient) {
      this.http.get('../../../assets/estudiantes.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              
              this.row = csvToRowArray[index].split(",");
              this.userArray.push(new UserD2L( this.row[0].substr(1,8), this.row[1], this.row[2].trim(), this.row[3] ));
            }
            console.log(this.userArray);
        },
        error => {
            console.log(error);
        }
    );
  
    
     }
     

  async ngOnInit() {
    this.getColoquios();
    this.valorString = '';
  }

  guardarColoquio() {
    this.showLoading();
    this.firestoreService.createDoc(this.newColoquio, this.path, this.newColoquio.id).then(res => {
      this.loading.dismiss();
      this.presentToast('Guardado con exito');
    }).catch(error => {
      this.presentToast('No se pudo guardar');
      console.log(error);

    });
  }

  actualizarColoquio() {
      this.showLoading();
      this.firestoreService.createDoc(this.newColoquio, this.path, this.newColoquio.id).then(res => {
        this.loading.dismiss();
        this.presentToast('actualizado con exito');
      }).catch(error => {
        this.presentToast('No se pudo actualizar');
        console.log(error);
  
      });

    
   
  }

  getColoquios() {
    //Observable. Nos suscribimos a este obsavable para ver todos los datos de la colleccion
    this.firestoreService.getCollection<Coloquio>(this.path).subscribe(res => {
      this.coloquios = res;
      console.log(res);

    });
  }

  async actualizaAProgreso(coloquio: Coloquio) {
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: 'Para editar la información de este coloquio se cambiariá a esta progreso. <br> Esto le permitirá <strong>escanear la asistencia</strong> ¿Está seguro de realizar este cambio? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('confirma cancel: blah');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Confirme Okey');
            coloquio.estado = 'progreso';
            console.log('info del coloquio con prox',coloquio);
            
            this.firestoreService.createDoc(coloquio, this.path, coloquio.id).then(res => {
              this.onProximo(coloquio);
              this.presentToast('eliminado con exito');
              this.alertController.dismiss();
            }).catch(error => {
              this.presentToast('error al eliminar eliminar');
            });


          },
        },
      ],
    });

    await alert.present();
  }

  async actualizaAProx(coloquio: Coloquio) {
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: 'Para editar la información de este coloquio se cambiariá el estado a próximo. <br> Lo cual <strong>eliminará el registro de asistencia</strong> ¿Está seguro de realizar este cambio? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('confirma cancel: blah');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Confirme Okey');
            coloquio.estado = 'proximo';
            console.log('info del coloquio con prox',coloquio);
            
            this.firestoreService.createDoc(coloquio, this.path, coloquio.id).then(res => {
              this.onProximo(coloquio);
              this.presentToast('eliminado con exito');
              this.alertController.dismiss();
            }).catch(error => {
              this.presentToast('error al eliminar eliminar');
            });


          },
        },
      ],
    });

    await alert.present();
  }

  async actualizarAFinalizado(coloquio: Coloquio) {
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: 'Cambiará el estado a finalizado. <br> Lo cual no le permitirá <strong>registrar asistencia</strong> y <strong>editar información del coloquio.</strong> <br> ¿Está seguro de realizar este cambio? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('confirma cancel: blah');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Confirme Okey');
            coloquio.estado = 'finalizado';
            console.log('info del coloquio con prox',coloquio);
            this.firestoreService.createDoc(coloquio, this.path, coloquio.id).then(res => {
              this.presentToast('eliminado con exito');
              this.alertController.dismiss();
            }).catch(error => {
              this.presentToast('no se puede eliminar');
            });


          },
        },
      ],
    });

    await alert.present();
  }

  async deleteColoquio(coloquio: Coloquio) {
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: 'Seguro desea <strong>eliminar</strong> este coloquio',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('confirma cancel: blah');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Confirme Okey');
            this.firestoreService.deleteDoc(this.path, coloquio.id).then(res => {
              this.presentToast('eliminado con exito');
              this.alertController.dismiss();
            }).catch(error => {
              this.presentToast('no se puede eliminar');
            });


          },
        },
      ],
    });

    await alert.present();
  }

  ionChangeEvent($event) {
    console.log('From Ioc Change:' + $event);
    //console.log(this.myProp);
  }
  ngMode($event) {

    console.log('From ngModel Change:' + $event);
    if($event==='proximo'){
      console.log('Selecciono proximo',$event);
      // this.onProximo( coloquio );
    }
    //console.log(this.myProp);
  }


  onProximo( coloquio: Coloquio ){
    const pathProx = this.path+coloquio.id+'/asistencia'
    console.log('path', pathProx)
    this.firestoreService.deleteSubcollection(pathProx, coloquio.id);
    // this.firestoreService.createDoc(this.newColoquio, this.path, this.newColoquio.id);
  }

  nuevo() {

    this.enableNewColoquio = true;
    this.newColoquio = {
      nombre: "",
      nameD2L:'',
      lugar: "",
      cantidad: null,
      fecha: null,
      id: this.firestoreService.getId(),
      // asistencia: [],
      estado: 'proximo',
      // id: this.firestoreService.getId(),

    };

  }

  ver() {
    this.enableViewColoquio = true;
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: 'normal',
      message: 'guardando...',
      duration: 1000,
    });

    this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });
  }

  filterEventByType(type: string) {
    return this.coloquios.filter(e => e.estado === type);

  }



  asistencia(coloquio: Coloquio){
    this.enableViewRegister = true; 
    this.enableViewColoquio=false;
    this.asistenciaService.verAsistencia(coloquio);
  }

  enviarCorreoAsistencia(coloquio: Coloquio){
    this.asistenciaService.enviarCorreo(coloquio.nameD2L);
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  funcionAuxCol(coloquio: Coloquio){
    console.log('pero vos sos loco viste',coloquio);
    return coloquio;
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();
      

      const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });

      if (result.hasContent) {
        this.valorString = await this.asistenciaService.addAsistenciaEstudiante(result.content);
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }
  

}

export class UserD2L{
  id: number;
  name: String;
  lastName: String;
  nota: number;

  constructor(id: number, name: String, lastName: String, nota: number){
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.nota = nota;
  }
}

