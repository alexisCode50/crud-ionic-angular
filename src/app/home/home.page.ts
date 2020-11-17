import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  products = [];
  countItems: BehaviorSubject<number>;

  constructor(
    public service:ProductService, 
    public alertController: AlertController
    ) { }

  ngOnInit() {
    this.getData();
    this.countItems = this.service.getCountProducts();
  }

  getData(){
    const data = this.service.getProducts();
    this.products = data;
    console.log(this.products)
  }

  async deleteItemConfirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Do you want to remove this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.service.deleteProduct(id);
          }
        }
      ]
    });

    await alert.present();
  }

}
