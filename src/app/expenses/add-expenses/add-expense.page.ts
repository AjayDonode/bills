import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Expense } from '../../expenses/expense.model';
import { ExpenseType } from '../../shared/enums';

@Component({
  selector: 'app-addexpense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})
export class AddExpensePage implements OnInit {
  expense: Expense;
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
    if (this.expense) {
      this.expense = this.navParams.data.expense;
    } else {
      this.expense = {
        id: null,
        title: '',
        amount: 0,
        payType: '1',
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
    await this.modalController.dismiss(this.expense);
  }
}
