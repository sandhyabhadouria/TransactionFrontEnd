import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';

@Component({
  selector: 'app-transaction-grid',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule],
  templateUrl: './transaction-grid.component.html',
  styleUrl: './transaction-grid.component.css'
})
export class TransactionGridComponent {
  displayedColumns: string[] = ['id', 'date', 'description', 'amount', 'type', 'runningBalance'];
  dataSource: any;
  readonly dialog = inject(MatDialog);
  constructor(private transactionService: TransactionService) { }
  ngOnInit() {
    this.GetAllTransaction();
  }

  GetAllTransaction() {
    this.transactionService.GetAllTransaction().subscribe((response:any) => {
      this.dataSource = response;
    });
  }
  addData(): void {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
    
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result) { 
        this.GetAllTransaction(); 
      }
    });
  }

  
}
