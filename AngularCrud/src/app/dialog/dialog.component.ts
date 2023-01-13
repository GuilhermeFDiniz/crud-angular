import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  productForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>) {  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      cep: ['', Validators.required],
      mercado: ['', Validators.required]

    })
  }

  addProduct(){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next:(res)=>{
          alert("Product added sucessfully!")
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the product")
        }
      })
    }
  }
}
