import { Component, OnInit } from '@angular/core';
import { ManageRfidService } from '../manage-rfid.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../manage-refid.models';
import { Rfid } from 'app/manage-rfid/manage-refid.models';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-total-amount',
  templateUrl: './total-amount.component.html',
  styleUrls: ['./total-amount.component.css']
})
export class TotalAmountComponent implements OnInit {

  readRfidView = false;
  TotalInfoView = false;
  ResultInfoView = false;
  ResultErrorView = false;
  rfidCode = "";

  allTransactions: Transaction[] = [];

  ReadRfidForm: FormGroup;

  constructor(
    private _manageRfidService: ManageRfidService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router

  ) { }

  ngOnInit() {
    // controlla i parametri 
    this._route.params
      .subscribe((params: Params) => {
        if (params['code'] != null) {
          this.readRfidView = false;
          this.getAllTransaztion(params['code']);
        }
        else {
         
          this.readRfidView = true;

          this.ReadRfidForm = this._fb.group({
            'rfidCode': ['', Validators.required]
          });
        }
      });

  }

  getTotal() {
    if (this.ReadRfidForm.value.rfidCode != '')
      this.getAllTransaztion(this.ReadRfidForm.value.rfidCode);
  }

  paidTotal() {

    this._manageRfidService.paidTotal(this.rfidCode)
      .subscribe((res) => {
        this.ResultInfoView = true;
        this.TotalInfoView = false;
        this.ResultErrorView = false;
      },
      err => {
        this.ResultInfoView = false;
        this.TotalInfoView = false;
        this.ResultErrorView = true;

      });

  }
  paidTotalReset() {
    this._manageRfidService.paidTotalReset(this.rfidCode)
      .subscribe((res) => {
        this.ResultInfoView = true;
        this.TotalInfoView = false;
        this.ResultErrorView = false;
      },
      err => {
        this.ResultInfoView = false;
        this.TotalInfoView = false;
        this.ResultErrorView = true;
      });
  }
  getAllTransaztion(rfideCode) {
    this.rfidCode = rfideCode
    this._manageRfidService.getAllTransactionRfid(rfideCode)

      .subscribe((res) => {
        this.allTransactions = res.json();

        this.TotalInfoView = true;
        this.readRfidView = false;
      },
      err => {
        console.log(err)
      })
  }

}


