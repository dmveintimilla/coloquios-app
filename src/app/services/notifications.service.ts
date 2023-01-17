import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { FirestoreService } from './firestore.service';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {
    ActionPerformed,
    PushNotificationSchema,
    PushNotifications,
    Token,
  } from '@capacitor/push-notifications';
import { AuthenticationService } from './authentication-service';



@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public platform: Platform,
              public authService: AuthenticationService,
              public firestoreService: FirestoreService,
              private router: Router,
              private http: HttpClient) {

                    this.stateUser();
               }

  
  stateUser() {
    this.authService.stateAuth().subscribe( res => {
      console.log(res);
      if (res !== null) {
          console.log('Se llamo State User de NOTIFICATIONS');
        //   this.inicializar();
      }  
    });

  }  
}
//   Init() {
//     console.log('Initializing Notification service');

//      PushNotifications.requestPermissions().then(result => {
//       if (result.receive === 'granted') {
//         PushNotifications.register();
//       } else {
//       }
//     });

//     PushNotifications.addListener('registration', (token: Token) => {
//       alert('Push registration success, token: ' + token.value);
//     });

//     PushNotifications.addListener('registrationError', (error: any) => {
//       alert('Error on registration: ' + JSON.stringify(error));
//     });

//     PushNotifications.addListener(
//       'pushNotificationReceived',
//       (notification: PushNotificationSchema) => {
//         alert('Push received: ' + JSON.stringify(notification));
//       },
//     );

//     PushNotifications.addListener(
//       'pushNotificationActionPerformed',
//       (notification: ActionPerformed) => {
//         alert('Push action performed: ' + JSON.stringify(notification));
//       },
//     );
//   }

// }

// PushNotifications.requestPermissions().then((result) => {
//     if (result.receive === 'granted') {
//         console.log('se garantizo permisos');
//       PushNotifications.register();
//     } else {
//       console.log('NO se garantizo permisos');
//       // Show some error
//     }
//   });

//   PushNotifications.addListener('registration', (token: Token) => {
//     // Push Notifications registered successfully.
//     // Send token details to API to keep in DB.
//   });

//   PushNotifications.addListener('registrationError', (error: any) => {
//     // Handle push notification registration error here.
//   });

//   PushNotifications.addListener(
//     'pushNotificationReceived',
//     (notification: PushNotificationSchema) => {
//       // Show the notification payload if the app is open on the device.
//     }
//   );

//   PushNotifications.addListener(
//     'pushNotificationActionPerformed',
//     (notification: ActionPerformed) => {
//       // Implement the needed action to take when user tap on a notification.
//     }
//   );
// }



//   inicializar() {
//     console.log('Se llamo inicializar');

//     if (this.platform.is('capacitor')) {

//         PushNotifications.requestPermissions().then((result) => {
//             if (result.receive === 'granted') {
//                PushNotifications.register();
//              } else {
//                console.log('No se dieron permisos de notificacion');
//              }
//         });

//       this.registerNotifications();
//       this.addListeners();
         
//     } else {
//       console.log('PushNotifications.requestPermission() -> no es movil');
//     }
//  }
  
  
//   readonly addListeners = async () => {
//     await PushNotifications.addListener('registration', token => {
//       console.info('Registration token: ', token.value);
//     });
  
//     await PushNotifications.addListener('registrationError', err => {
//       console.error('Registration error: ', err.error);
//     });
  
//     await PushNotifications.addListener('pushNotificationReceived', notification => {
//       console.log('Push notification received: ', notification);
//     });
  
//     await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
//       console.log('Push notification action performed', notification.actionId, notification.inputValue);
//     });
//   }
  
//   readonly registerNotifications = async () => {
//     let permStatus = await PushNotifications.checkPermissions();
  
//     if (permStatus.receive === 'prompt') {
//       console.log('permisos concedidos');
//       permStatus = await PushNotifications.requestPermissions();
//     }
  
//     if (permStatus.receive !== 'granted') {
//       console.log('PushNotifications.requestPermission() -> no es movil');
//       throw new Error('User denied permissions!');
//     }
  
//     await PushNotifications.register();
//   }
//   // addListeners() {

//   //     LocalNotifications.schedule({
//   //       notifications: [
//   //         {
//   //           title: 'notificacion local',
//   //           body: 'notification.body',
//   //           id: 1,
//   //         }
//   //       ]
//   //     });

//   //     PushNotifications.addListener('registration',
//   //       (token: PushNotificationToken) => {
//   //         console.log('The token is:', token);
//   //         this.guadarToken(token.value);
//   //       }
//   //     );

//   //     PushNotifications.addListener('registrationError',
//   //       (error: any) => {
//   //         console.log('Error on registration', error);
//   //       }
//   //     );

//   //     /// primer plano
//   //     PushNotifications.addListener('pushNotificationReceived',
//   //       (notification: PushNotification) => {
//   //         console.log('Push received en 1er plano: ', notification);

//   //             // LocalNotifications.schedule({
//   //             //   notifications: [
//   //             //     {
//   //             //       title: 'notificacion local',
//   //             //       body: notification.body,
//   //             //       id: 1,
//   //             //       extra: {
//   //             //         data: notification.data
//   //             //       }
//   //             //     }
//   //             //   ]
//   //             // });
//   //       }
//   //     );

//   //     PushNotifications.addListener('pushNotificationActionPerformed',
//   //       (notification: PushNotificationActionPerformed) => {
//   //         console.log('Push action performed en segundo plano -> ', notification);
          
//   //         this.router.navigate([notification.notification.data.enlace]);
//   //       }
//   //     );

//   //     // LocalNotifications.addListener('localNotificationActionPerformed', 
//   //     // (notification: LocalNotificationActionPerformed) => {
//   //     //    console.log('Push action performed en primer plano: ', notification);
//   //     //    this.router.navigate([notification.notification.extra.data.enlace]);
//   //     // });
//   // }

//   async guadarToken(token: any) {

//       const Uid = await this.authService.getUid();

//       if (Uid) {
//           console.log('guardar Token Firebase ->', Uid);
//           const path = '/Clientes/';
//           const userUpdate = {
//             token: token,
//           };
//           this.firestoreService.updateDoc(userUpdate, path, Uid);
//           console.log('guardar TokenFirebase()->', userUpdate, path, Uid);
//       }
//   }

//   newNotication() {

//       const receptor = 'CHpQBloQ36ZRsLoGz9RmUwBAstR2'
//       const path = 'Clientes/';
//       this.firestoreService.getDoc<any>(path, receptor).subscribe( res => {
//             if (res) {
//                 const token = res.token;
//                 const dataNotification = {
//                   enlace: '/mis-pedidos',
//                 }
//                 const notification = {
//                   title: 'Mensaje enviado manuelmente',
//                   body: 'Adios'
//                 };
//                 const msg: INotification = {
//                       data: dataNotification,
//                       tokens: [token],
//                       notification,
//                 }
//                 const url = 'https://us-central1-gasdomi.cloudfunctions.net/newNotification';
//                 return this.http.post<Res>(url, {msg}).subscribe( res => {
//                       console.log('respuesta newNotication() -> ', res);
                      
//                 });
//             }

//       });


//   }



// }

// interface INotification {
//   data: any;
//   tokens: string[];
//   notification: any
// }


// interface Res {
//   respuesta: string;
// }




// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

// admin.initializeApp();

// const firestore = admin.firestore();
// const uidAdmin = 'CHpQBloQ36ZRsLoGz9RmUwBAstR2';

// const cors = require('cors')({
//     origin: true,
// });

// exports.newPedido = functions.firestore
//     .document('/Clientes/{userId}/pedidos/{pedidoId}')
//     .onCreate( async (event) => {

//         const pedido = event.data();

//         const dataFcm = {
//             enlace: '/pedidos',
//         }

//         const path = '/Clientes/' + uidAdmin;
//         const docInfo = await  firestore.doc(path).get();
//         const dataUser = docInfo.data() as any;
//         const token = dataUser.token;
//         const registrationTokens = [token];

//         const notification: INotification = {
//             data: dataFcm,
//             tokens: registrationTokens,
//             notification: {
//                 title: pedido.cliente.nombre,
//                 body: 'nuevo pedido',
//             },
//         }

//         return sendNotification(notification);
   
        

//     });

// exports.eventPedido = functions.firestore
//     .document('/Clientes/{userId}/pedidos/{pedidoId}')
//     .onUpdate( async (event, eventContext) => {

//         const userUid = eventContext.params.userId;
//         const pedido = event.after.data()

//         const dataFcm = {
//             enlace: '/mis-pedidos',
//         }

//         const path = '/Clientes/' + userUid;
//         const docInfo = await  firestore.doc(path).get();
//         const dataUser = docInfo.data() as any;
//         const token = dataUser.token;
//         const registrationTokens = [token];

//         const notification: INotification = {
//             data: dataFcm,
//             tokens: registrationTokens,
//             notification: {
//                 title: 'Seguimiento de tu pedido',
//                 body: 'Pedido ' +  pedido.estado,
//             },
//         }

//         return  sendNotification(notification);
   
        

//     });


// const sendNotification = (notification: INotification) => {

//         return new Promise((resolve) => {

//             const message: admin.messaging.MulticastMessage = {
//                 data: notification.data,
//                 tokens: notification.tokens,
//                 notification: notification.notification,
//                 android: {
//                     notification: {
//                         icon: 'ic_stat_name',
//                         color: '#EB9234',
//                     } 
//                 },
//                 apns: {
//                     payload: {
//                         aps: {
//                             sound: {
//                                 critical: true,
//                                 name: 'default',
//                                 volume: 1,
//                             }
//                         }
//                     }
//                 }
            
//             }
//             console.log('List of tokens send', notification.tokens);
            
//             admin.messaging().sendMulticast(message)
//             .then((response) => {
//                 if (response.failureCount > 0) {
//                     const failedTokens: any[] = [];
//                     response.responses.forEach((resp, idx) => {
//                         if (!resp.success) {
//                         failedTokens.push(notification.tokens[idx]);
//                         }
//                     });
//                     console.log('List of tokens that caused failures: ' + failedTokens);
//                     // elimnar tokens 
//                 } else {
//                     console.log('Send notification exitoso -> ')
//                 }
//                 resolve(true);
//                 return;
//             }).catch( error => {
//                console.log('Send fcm falló -> ', error)
//                resolve(false);
//                return;
//             }); 
  
//         });
     
// } 

// export const newNotification = functions.https.onRequest((request, response) => {

//     return cors(request, response, async () => {

//         if(request.body.data) {    
//             const notification = request.body.data as INotification;
//             await sendNotification(notification)
//             const res = {
//                 respuesta: 'success'
//             };
//             response.status(200).send(res);    
//         } else {
//             const res = {
//                 respuesta: 'error'
//             };
//             response.status(200).send(res);
//         }
//     });
// });


// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// //
// // export const helloWorld = functions.https.onRequest((request, response) => {
// //   functions.logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });


// interface INotification {
//     data: any;
//     tokens: string[];
//     notification: admin.messaging.Notification;
// }

