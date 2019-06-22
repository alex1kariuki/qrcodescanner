import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title: string;
  description: string;
  codeInput: boolean;

  constructor(private qrScanner: QRScanner, private toast: ToastController) {
    this.title = 'Scan QR Code';
    this.description = 'Align the qr code on the space below to scan the qr code.';
    this.codeInput = false;
  }

  scanQr() {
    this.title = 'Scan QR Code';
    this.description = 'Align the qr code on the space below to scan the qr code.';
    this.codeInput = false;
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          this.presentToast();
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          this.presentToast();
        }
      })
      .catch((e: any) => {
        console.log('Error is', e);
        // this.presentToast();
      });

  }
  refresh() {
    window.location.reload();
  }
  enterCode() {
    this.title = 'Enter code in the QR';
    this.description = 'Please enter the booking ID below';
    this.codeInput = true;
  }
   async presentToast() {
    const toast = await this.toast.create({
      message: 'Could not launch camera, permission denied.',
      duration: 3000
    });
    return await toast.present();
  }
}
