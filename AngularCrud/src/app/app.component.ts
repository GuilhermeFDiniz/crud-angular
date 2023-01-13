import { ApiService } from './services/api.service';
import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularCrud';

  displayedColumns: string[] = ['productName', 'category', 'mercado', 'cep'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService){}

  ngOnInit(): void {
    this.getAllProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }
  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        alert("Error while fetching the Records")
      }
    })
  }
}
