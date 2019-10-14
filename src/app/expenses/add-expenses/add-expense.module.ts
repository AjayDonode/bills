import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddExpensePage } from '../add-expenses/add-expense.page';

const routes: Routes = [
  {
    path: '',
    component: AddExpensePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddExpensePage],
  entryComponents: [AddExpensePage]
})
export class AddExpensePageModule {}
