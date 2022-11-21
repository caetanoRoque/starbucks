import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CustomAlertService {

  constructor(public alertController: AlertController) {}

  async presentAlert(mensagem: string, botao:string) {
    const alert = await this.alertController.create({
      cssClass: 'alert_erro',
      message: '<p class="alert_message">'+mensagem+'</p>',
      buttons: [
        {
          text: botao,
          cssClass: 'alert_erro_botao'
        }
      ]
    });

    await alert.present();
    
    const { role } = await alert.onDidDismiss();
  }
}
