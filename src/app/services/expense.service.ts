import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../expenses/expense.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private expenseList: Observable<Expense[]>;
  private expenseCollection: AngularFirestoreCollection<Expense>;
  constructor(private afs: AngularFirestore) {
    this.expenseCollection = this.afs.collection<Expense>('expense');

    this.expenseList = this.expenseCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          data.id = id;
          return { id, ...data };
        });
      })
    );
  }

  getExpenses(): Observable<Expense[]> {
    return this.expenseList;
  }

  saveExpense(expense: Expense) {
    return this.expenseCollection.add(expense);
  }

  updateExpense(expense: Expense) {
    return this.expenseCollection.doc(expense.id).update(expense);
  }

  removeExpense(id) {
    return this.expenseCollection.doc(id).delete();
  }

  getExpense(id: string): Observable<Expense> {
    return this.expenseCollection.doc<Expense>(id).valueChanges().pipe(
      take(1),
      map(expense => {
        expense.id = id;
        return expense;
      })
    );
  }
}
