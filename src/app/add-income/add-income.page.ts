import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Income } from '../income/income.model';
import { IncomePage } from '../income/income.page';

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

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    this.income = {
      id: null,
      title: '',
      amount: 0,
      payType: 0,
      description: ''
    };
  }
  addIncomeRequest() {
    this.closeModal();
  }

  close() {
    this.income = null;
    this.closeModal(); }

  async closeModal() {
    await this.modalController.dismiss(this.income);
  }
}
