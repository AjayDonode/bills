import { Component, OnInit } from '@angular/core';
import { Income } from './income.model';
import { ModalController } from '@ionic/angular';
import { AddIncomePageModule } from '../add-income/add-income.module';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {
  income: Income[] = [];
  dataReturned: any;
  constructor(public modalController: ModalController) {
  }

  async openModal() {
    console.log('Here ');
    
    const modal = await this.modalController.create({
      component: AddIncomePageModule,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  ngOnInit() {
  }
}
