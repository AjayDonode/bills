import { Component, OnDestroy, OnInit } from '@angular/core';
import { Expense } from './expense.model';
import { FormGroup, NgForm } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { AddExpensePage } from './add-expenses/add-expense.page';
import { ExpenseService } from '../services/expense.service';
import { ExpenseType } from '../shared/enums';
import { IncomeService } from '../services/income.service';

@Component({
  selector: 'app-expenses',
  templateUrl: 'expenses.page.html',
  styleUrls: ['expenses.page.scss']
})
export class ExpensesPage implements OnInit, OnDestroy {
  expenses: Expense[] = [];
  expenseForm: FormGroup;
  expense = '';
  amount = null;
  private subscriptionA;
  private subscriptionB;
  totalExpenses = 0;
  totalIncome = 0;

  incomeList;


  constructor(public modalController: ModalController,
              private nav: NavController,
              private expenseService: ExpenseService,
              private incomeService: IncomeService) { }

  edit(expense) {
    this.openModal(expense);
  }

  delete(expense) {
    this.expenseService.removeExpense(expense.id);
    this.calculateTotalExpense();
  }

  calculateTotalExpense() {
    this.totalExpenses = 0;
    this.expenses.forEach(element => {
      if (element.payType === ExpenseType.Monthly) {
        this.totalExpenses += element.amount * 12;
      } else if (element.payType === ExpenseType.BiWeekly) {
        this.totalExpenses += element.amount * 24;
      } else if (element.payType === ExpenseType.Weekly) {
        this.totalExpenses += element.amount * 36;
      } else {
        this.totalExpenses += element.amount;
      }
    });
    // this.isBusy = false;
  }

  ngOnInit() {
    this.subscriptionA = this.expenseService.getExpenses().subscribe(res => {
      console.log(res);
      this.expenses = res;
      this.calculateTotalExpense();
    });


    this.subscriptionB = this.incomeService.getIncomes().subscribe(res => {
      console.log(res);
      this.incomeList = res;
      this.calculateTotalIncome();
    });

  }
  calculateTotalIncome() {

      this.totalIncome = 0;
      this.incomeList.forEach(element => {
        if (element.payType === ExpenseType.Monthly) {
          this.totalIncome += element.amount * 12;
        } else if (element.payType === ExpenseType.BiWeekly) {
          this.totalIncome += element.amount * 24;
        } else if (element.payType === ExpenseType.Weekly) {
          this.totalIncome += element.amount * 36;
        } else {
          this.totalIncome += element.amount;
        }
      });
  }

  clear() {
    this.expense = '';
    this.amount = null;
  }

  async openModal(expense) {
    const modal = await this.modalController.create({
      component: AddExpensePage,
      componentProps: {
        expense
      }
    });


    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data.id == null) {
        this.expenseService.saveExpense(dataReturned.data);
      } else {
        this.expenseService.updateExpense(dataReturned.data);
      }
      this.calculateTotalExpense();
    });
    return await modal.present();
  }

  ngOnDestroy(): void {
    this.subscriptionA.unsubscribe();
    this.subscriptionB.unsubscribe();
  }

}
