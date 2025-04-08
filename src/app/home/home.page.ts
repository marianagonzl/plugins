import { Component } from '@angular/core';
import {IonHeader,IonToolbar,IonTitle,IonContent,IonButton,} from '@ionic/angular/standalone';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Network } from '@capacitor/network';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Geolocation } from '@capacitor/geolocation';

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
standalone: true,
imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
latitude: number | null = null;
longitude: number | null = null;

constructor() {}
  
getCurrentPosition = async () => {
try {
const position = await Geolocation.getCurrentPosition();
this.latitude = position.coords.latitude;
this.longitude = position.coords.longitude;
console.log('Latitud:', this.latitude);
console.log('Longitud:', this.longitude);
} catch (error) {
console.error('Error obteniendo la ubicación', error);
}
};


checkNetworkStatus = async () => {
try {
const status = await Network.getStatus();
console.log('Conectado:', status.connected);
console.log('Tipo de conexión:', status.connectionType);
alert(
status.connected
? `Estás conectado por ${status.connectionType}`
: 'No tienes conexión a Internet'
);
} catch (error) {
console.error('Error al verificar el estado de red:', error);
}
};


saveFile = async () => {
try {
await Filesystem.writeFile({
path: 'mensaje.txt',
data: '¡Hola desde Ionic y Capacitor!',
directory: Directory.Documents,
encoding: Encoding.UTF8,
});
alert('Archivo guardado correctamente');
} catch (e) {
console.error('Error al guardar el archivo', e);
}
};


readFile = async () => {
try {
const contents = await Filesystem.readFile({
path: 'mensaje.txt',
directory: Directory.Documents,
encoding: Encoding.UTF8,
});
alert('Contenido del archivo:\n' + contents.data);
} catch (e) {
console.error('Error al leer el archivo', e);
alert('Error al leer el archivo');
}
};


takePhoto = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    });
    console.log('Imagen tomada:', image);
  } catch (error) {
    console.error('Error al tomar la foto:', error);
  }
}
}