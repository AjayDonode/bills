import { Component, OnInit, OnDestroy } from '@angular/core';
import { Income } from './income.model';
import { ModalController, NavController } from '@ionic/angular';
import { AddIncomePage } from '../add-income/add-income.page';
import { IncomeService } from '../services/income.service';
import { Observable } from 'rxjs';
import { ExpenseType } from '../shared/enums';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit, OnDestroy {
  isBusy = false;
  private subscription;
  incomeList: Income[];
  total = 0;
  constructor(public modalController: ModalController, private nav: NavController, private incomeService: IncomeService) {
  }

  edit(income) {
    this.openModal(income);
  }

  delete(income) {
    this.incomeService.removeIncome(income.id);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    this.incomeList.forEach(element => {
      if (element.payType === ExpenseType.Monthly) {
        this.total += element.amount * 12;
      } else if (element.payType === ExpenseType.BiWeekly) {
        this.total += element.amount * 24;
      } else if (element.payType === ExpenseType.Weekly) {
        this.total += element.amount * 36;
      } else {
        this.total += element.amount;
      }
    });
    this.isBusy = false;
  }

  async openModal(income) {
    const modal = await this.modalController.create({
      component: AddIncomePage,
      componentProps: {
        income
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data.id == null) {
        this.incomeService.saveIncome(dataReturned.data);
      } else {
        this.incomeService.updateIncome(dataReturned.data);
      }
      this.calculateTotal();
    });
    return await modal.present();
  }

  ngOnInit() {
    this.subscription = this.incomeService.getIncomes().subscribe(res => {
      console.log(res);
      this.incomeList = res;
      this.calculateTotal();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
