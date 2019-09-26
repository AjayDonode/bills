import { Component } from '@angular/core';
import { Expense } from './expense.model';
import { FormGroup, NgForm } from '@angular/forms';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  expenses: Expense[] = [{
    id: '1L',
    title: 'Sample data',
    ammount: 20
  }];
  expenseForm: FormGroup;
  expense = '';
  amount = null;
  total = 0;
  constructor() { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.calculateTotal();
  }

  addExpenseRequest() {
    const formData = {
      id: '2L',
      title: this.expense,
      ammount: this.amount
    };
    this.expenses.push(formData);
    this.calculateTotal();
    this.clear();
  }
  clear() {
    this.expense = '';
    this.amount = null;
  }
  delete(data) {
    const index: number = this.expenses.indexOf(data);
    if (index !== -1) {
      this.expenses.splice(index, 1);
    }
    this.calculateTotal();
  }
  calculateTotal() {
    this.expenses.forEach(element => {
      this.total += element.ammount;
    });
  }
}
