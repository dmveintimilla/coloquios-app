import { Injectable } from '@angular/core';
import { Estudiante, Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
// import { File } from '@ionic-native/file/ngx';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor( private storage: Storage,
               private navCtrl: NavController,  ) {
    //cargar registros
    this.cargarStorage();
   }

   async cargarStorage() {
    this.guardados = await this.storage.get('registros1') || [];
  }


  async guardarRegistro( format: string, text: string  ) {

    await this.cargarStorage();

    const nuevoRegistro = new Registro( format, text );
    this.guardados.unshift( nuevoRegistro );

    console.log(this.guardados);
    this.storage.set('registros1', this.guardados);
    

    this.abrirRegistro( nuevoRegistro );

  }


  abrirRegistro( registro: Registro ) {

    // set/coloquios.ts

    //  asistencia(coloquio: Coloquio){
    // this.asistenciaService.verAsistencia(coloquio);
  


  }

  enviarCorreo( ) {

    const arrTemp = [];
    const titulos = ` Username, EjColoquio1 Points Grade <NumÃ©rico Puntos mÃ¡x.:1>, End-of-Line Indicator\n`;

    arrTemp.push( titulos );

    this.guardados.forEach( registro => {

      const linea = ` ${ registro.id },1, #\n`;

      arrTemp.push( linea );

    });

    console.log( arrTemp.join('') );

    // this.crearArchivoFisico( arrTemp.join('') );

  }

  // crearArchivoFisico( text: string ) {

  //   this.file.checkFile( this.file.dataDirectory, 'registros1.csv' )
  //     .then( existe => {
  //       console.log('Existe archivo?', existe );
  //       return this.escribirEnArchivo( text );
  //     })
  //     .catch( err => {

  //       return this.file.createFile( this.file.dataDirectory, 'registros1.csv', false )
  //               .then( creado => this.escribirEnArchivo( text ) )
  //               .catch( err2 => console.log( 'No se pudo crear el archivo', err2 ));

  //     });


  // }

  // async escribirEnArchivo( text: string ) {

  //   await this.file.writeExistingFile( this.file.dataDirectory, 'registros1.csv', text );

  //   const archivo = `${this.file.dataDirectory}/registros1.csv`;
  //   // console.log(this.file.dataDirectory + 'registros.csv');

  //   const email = {
  //     to: 'diegol_sheva7@hotmail.com',
  //     // cc: 'erika@mustermann.de',
  //     // bcc: ['john@doe.com', 'jane@doe.com'],
  //     attachments: [
  //       archivo
  //     ],
  //     subject: 'Backup de scans',
  //     body: 'Backups de los scans - <strong>ScanApp</strong>',
  //     isHtml: true
  //   };

  //   // Send a text message using default options
  //   this.emailComposer.open(email);

  // }



}
