import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CepCnpjService {

  constructor(private httpCliente: HttpClient) { }

    buscarCep(cep:String){
      return this.httpCliente.get(`https://brasilapi.com.br/api/cep/v1/${cep}`)
    }

    buscarCnpj(cnpj:String){
      return this.httpCliente.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
    }
}
