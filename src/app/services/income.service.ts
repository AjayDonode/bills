import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Income } from '../income/income.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private incomeList: Observable<Income[]>;
  private incomeCollection: AngularFirestoreCollection<Income>;
  constructor(private afs: AngularFirestore) {
    this.incomeCollection = this.afs.collection<Income>('income');

    this.incomeList = this.incomeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getIncomes(): Observable<Income[]> {
    return this.incomeList;
  }

  saveIncome(income: Income) {
    return this.incomeCollection.add(income);
  }


  removeIncome(id) {
    return this.incomeCollection.doc(id).delete();
  }


  getIncome(id: string): Observable<Income> {
    return this.incomeCollection.doc<Income>(id).valueChanges().pipe(
      take(1),
      map(income => {
        income.id = id;
        return income;
      })
    );
  }
}
