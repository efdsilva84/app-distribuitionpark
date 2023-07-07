import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Login } from '../models/login';
import { Observable} from  'rxjs'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'admin 1234'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }



  logar(data:any) {
    return this.api.post('cadastros/logar', data, httpOptions);
  }
}
