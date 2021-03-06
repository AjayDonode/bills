import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Income } from '../income/income.model';
import { IncomePage } from '../income/income.page';
import { ExpenseType } from '../shared/enums';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.page.html',
  styleUrls: ['./add-income.page.scss'],
})
export class AddIncomePage implements OnInit {
  income: Income;
  modalTitle: string;
  modelId: number;
  title: string;
  amount: number;
  description: string;
  payType: number;
  keys = Object.keys;
  expenseType = ExpenseType;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    if (this.income) {
      this.income = this.navParams.data.income;
    } else {
      this.income = {
        id: null,
        title: '',
        amount: 0,
        payType: '',
        description: ''
      };
    }
  }

  addIncomeRequest() {
    this.closeModal();
  }

  close() {
    this.closeModal();
  }

  async closeModal() {
    await this.modalController.dismiss(this.income);
  }
}
