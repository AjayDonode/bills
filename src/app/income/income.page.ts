import { Component, OnInit, OnDestroy } from '@angular/core';
import { Income } from './income.model';
import { ModalController, NavController } from '@ionic/angular';
import { AddIncomePage } from '../add-income/add-income.page';
import { IncomeService } from '../services/income.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit, OnDestroy {
  
  private subscription;
  incomeList: Income[];
  total = 0;
  constructor(public modalController: ModalController, private nav: NavController, private incomeService: IncomeService) {
  }

  delete(income) {
    this.incomeService.removeIncome(income.id);
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
        this.incomeService.saveIncome(dataReturned.data);
        this.calculateTotal();
      }
    });
    return await modal.present();
  }


  ngOnInit() {
    this.subscription  = this.incomeService.getIncomes().subscribe(res => {
      console.log(res);
      this.incomeList = res;
      this.calculateTotal();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
