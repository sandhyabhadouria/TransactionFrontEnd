import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TransactionService } from '../../services/transaction.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TransactionGridComponent } from '../transaction-grid/transaction-grid.component';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatInputModule
  ],
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']  // Corrected here
})
export class AddTransactionComponent implements OnInit {
  transactionForm!: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService,private dialogRef: MatDialogRef<TransactionGridComponent> ) {}

  ngOnInit() {
    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      let currentDate = new Date(); 
      let dateToSend = currentDate.toISOString();
      
      const transaction: any = {
        id: 0,
        date: dateToSend,
        amount: this.transactionForm.controls['amount'].value,
        description: this.transactionForm.controls['description'].value,
        type: this.transactionForm.controls['type'].value, // Ensuring correct type format
        runningBalance: 0
      };

      this.transactionService.AddTransaction(transaction).subscribe(
        (response: any) => {
          alert(response.transaction);
          this.dialogRef.close(true);
          //console.log('Response:', response);
        },
        (error: any) => {
          alert('Transaction added successfully!');
          this.dialogRef.close(true);
          console.error('Error:', error);
          
        }
      );
    } else {
      console.error('Form is invalid:', this.transactionForm.errors);
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
