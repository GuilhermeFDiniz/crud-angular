import { CepCnpjService } from './../services/cep-cnpj.service';
import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  actionBtn: string = 'Save'

  productForm !: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private searchCepCnpj: CepCnpjService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) {  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      cnpj: ['', Validators.required],
      razao_social: ['', Validators.required],
      nome_fantasia: [''],
      capital_social: [''],
      site: [''],
      mercado: [''],
      cnae_fiscal: [''],
      cnae_fiscal_descricao: [''],
      email: ['', Validators.email],
      ddd_telefone_1: ['', Validators.required],
      street: ['', Validators.required],
      numero: [''],
      cep: ['', Validators.required],
      neighborhood: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      complemento: [''],
      nome_socio: [''],
      qualificacao_socio: [''],
      data_entrada_sociedade: ['']

    })
    if(this.editData){
      this.actionBtn= 'Update';
      this.productForm.controls['cnpj'].setValue(this.editData.cnpj);
      this.productForm.controls['razao_social'].setValue(this.editData.razao_social);
      this.productForm.controls['nome_fantasia'].setValue(this.editData.nome_fantasia);
      this.productForm.controls['capital_social'].setValue(this.editData.capital_social);
      this.productForm.controls['site'].setValue(this.editData.site);
      this.productForm.controls['mercado'].setValue(this.editData.mercado);
      this.productForm.controls['cnae_fiscal'].setValue(this.editData.cnae_fiscal);
      this.productForm.controls['cnae_fiscal_descricao'].setValue(this.editData.cnae_fiscal_descricao);
      this.productForm.controls['email'].setValue(this.editData.email);
      this.productForm.controls['ddd_telefone_1'].setValue(this.editData.ddd_telefone_1);
      this.productForm.controls['street'].setValue(this.editData.street);
      this.productForm.controls['numero'].setValue(this.editData.numero);
      this.productForm.controls['cep'].setValue(this.editData.cep);
      this.productForm.controls['neighborhood'].setValue(this.editData.neighborhood);
      this.productForm.controls['city'].setValue(this.editData.city);
      this.productForm.controls['state'].setValue(this.editData.state);
      this.productForm.controls['complemento'].setValue(this.editData.complemento);
      this.productForm.controls['nome_socio'].setValue(this.editData.nome_socio);
      this.productForm.controls['qualificacao_socio'].setValue(this.editData.qualificacao_socio);
      this.productForm.controls['data_entrada_sociedade'].setValue(this.editData.data_entrada_sociedade);
    }
  }

  addProduct(){
    if(!this.editData){
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
    } else {
      this.updateProduct()
    }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated Succesfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record")
      }
    })
  }

  populaFormCep(dados: any, form: any){
    console.log(dados)
    console.log(form)
      this.productForm.controls['neighborhood'].setValue(dados.neighborhood);
      this.productForm.controls['city'].setValue(dados.city);
      this.productForm.controls['state'].setValue(dados.state);
      this.productForm.controls['street'].setValue(dados.street);

  }

  populaFormCnpj(dados: any, form: any){
    console.log(dados)
    console.log(form)
    this.productForm.controls['razao_social'].setValue(dados.razao_social);
    this.productForm.controls['nome_fantasia'].setValue(dados.nome_fantasia);
    this.productForm.controls['capital_social'].setValue(dados.capital_social);
    this.productForm.controls['cnae_fiscal'].setValue(dados.cnae_fiscal);
    this.productForm.controls['cnae_fiscal_descricao'].setValue(dados.cnae_fiscal_descricao);
    this.productForm.controls['email'].setValue(dados.email);
    this.productForm.controls['ddd_telefone_1'].setValue(dados.ddd_telefone_1);
    this.productForm.controls['nome_socio'].setValue(dados.qsa[0].nome_socio);
    this.productForm.controls['qualificacao_socio'].setValue(dados.qsa[0].qualificacao_socio);
    this.productForm.controls['data_entrada_sociedade'].setValue(dados.qsa[0].data_entrada_sociedade);
}

  consultaCep(valor: any, form: any){
    this.searchCepCnpj.buscarCep(valor).subscribe((dados) => this.populaFormCep(dados, form));
  }

  consultaCnpj(valor: any, form: any){
    this.searchCepCnpj.buscarCnpj(valor).subscribe((dados) => this.populaFormCnpj(dados, form));
  }

  onFocusOutEventCep(event: any, form: any) {
    console.log(event)
    console.log(form)
    this.consultaCep(event.target.value, form)
  }

  onFocusOutEventCnpj(event: any, form: any) {
    console.log(event)
    console.log(form)
    this.consultaCnpj(event.target.value, form)
  }



}
