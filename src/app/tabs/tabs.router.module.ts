import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'task',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../task/task.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'bills',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../bills/bills.module').then(m => m.BillsPageModule)
          }
        ]
      },
      {
        path: 'expenses',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../expenses/expenses.module').then(m => m.ExpensesPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/task',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/task',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
