import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  GetAllTransactionURL="api/Transaction/GetAllTransactions";
  AddTransactionURL="api/Transaction/AddTransaction";
  constructor(
    private http:HttpClient
  )  { }

  GetAllTransaction(){
    return this.http.get<any>(`${environment.apiUrl}`+ '/' + `${this.GetAllTransactionURL}`)
  }
  AddTransaction(data:any){
    return this.http.post<any>(`${environment.apiUrl}`+ '/' + `${this.AddTransactionURL}`,data)
  }
}
