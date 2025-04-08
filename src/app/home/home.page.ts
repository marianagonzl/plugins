import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Network } from '@capacitor/network';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  constructor() {}

  takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    

    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
    });
    
    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();
    
      console.log('Network status:', status);
    };
    console.log(image.dataUrl);
  };

}


