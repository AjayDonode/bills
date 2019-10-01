import { Component, OnInit } from '@angular/core';
import { Income } from './income.model';
import { ModalController } from '@ionic/angular';
import { AddIncomePage } from '../add-income/add-income.page';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {
  incomeList: Income[] = [];
  total = 0;
  constructor(public modalController: ModalController) {
  }

  delete(income) {
    const index: number = this.incomeList.indexOf(income);
    if (index !== -1) {
      this.incomeList.splice(index, 1);
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    this.incomeList.forEach(element => {
      this.total += element.amount;
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AddIncomePage,
      // componentProps: {
      //   "paramID": 123,
      //   "paramTitle": "Test Title"
      // }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.incomeList.push(dataReturned.data);
        this.calculateTotal();
      }
    });

    return await modal.present();
  }

  ngOnInit() {
  }
}
