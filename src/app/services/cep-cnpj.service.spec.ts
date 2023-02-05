import { TestBed } from '@angular/core/testing';

import { CepCnpjService } from './cep-cnpj.service';

describe('CepCnpjService', () => {
  let service: CepCnpjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CepCnpjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
