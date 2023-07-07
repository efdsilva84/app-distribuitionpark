import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Login } from '../models/login';




const LS_CHAVE: string = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public get usuarioLogado():User{
    let usu = localStorage[LS_CHAVE];
    return (usu ?   JSON.parse(localStorage[LS_CHAVE]): null);
  }

  public set usuarioLogado(usuario: User){
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  logout(){
    delete localStorage[LS_CHAVE];
  }
  login(login: Login): Observable<User | null>{
    let usu = new User();

    if(login.login == login.senha){
      if(login.login == "admin"){
        usu = new User();
      }else if(login.login == "gerente"){
        usu = new User()
      }
      return of(usu);
    }
    else{
      return of(usu)
    }
  }
}
