import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'income', loadChildren: './income/income.module#IncomePageModule' },
  { path: 'add-income', loadChildren: './add-income/add-income.module#AddIncomePageModule' },
  { path: 'expense', loadChildren: './expenses/expenses.module#ExpensesPageModule' },
  { path: 'add-expense', loadChildren: './expenses/add-expenses/add-expense.module#AddExpensePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
