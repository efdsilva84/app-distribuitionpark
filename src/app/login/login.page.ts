import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class LoginPage implements OnInit {
  cpf?: number;
  senha?: number;
  userLogado:any;
  usuario:any;

  fGroup!: FormGroup;

  listData =[];


  constructor(private fBuilder: FormBuilder, private auth:AuthService, private loadingCtrl: LoadingController,
    private toast: ToastService, private router: Router, private storage: StorageService

    ) {


   }

  ngOnInit() {

    this.fGroup = this.fBuilder.group({
      'login': [null, Validators.compose([
        Validators.required
      ])],
      'senha':[null, Validators.compose([
        Validators.required, Validators.maxLength(6), Validators.maxLength(16)
      ])],
    });

  }



 async enviar(){
  console.log(this.fGroup.value);
  const loader = await this.loadingCtrl.create({
    message: 'Aguarde ...',
    spinner: 'crescent',
    duration: 2000,
    showBackdrop: true,
  });
  await loader.present();
    this.auth.logar(this.fGroup.value).subscribe(async(data:any)=>{
      if(data.error === false){
        this.toast.showSucess(data.message);
        this.userLogado = data;
        await this.storage.set('user', this.userLogado.data);

        this.usuario = await this.storage.get('user');
        console.log("usuario recuperado apos o set", this.usuario);
          if(this.usuario.perfil === 'inquilino'){
            this.router.navigate(['registros-dia']);
          }else if(this.usuario.perfil === 'portaria'){
            this.router.navigate(['home']);
          }else if(this.usuario.perfil === 'adm'){
            this.router.navigate(['home']);

          }



      }else if(data.error === true){
        this.toast.showError("Login/ou senha inválidos");

      }




      /*if(data.error === true){
        this.toast.showError("Login/ou senha inválidos");
      }else if(data.error === false){
      this.userLogado = data;
      console.log("dados do user",this.userLogado.data);
      await this.storage.set('user', this.userLogado.data);
      this.usuario = await this.storage.get('user');
        if(this.usuario.pefil === 'portaria'){
          this.router.navigate(['home']);
          this.toast.showSucess("Login Realizado com Seucesso");

        }else if(this.usuario.perfil === 'inquilino'){
          this.router.navigateByUrl('registros-dia');
          this.toast.showSucess("Login Realizado com Seucesso");

        }
      }*/



    })

 }

 openPass(evento:any){
  console.log(evento)
    var senha = document.getElementById('senha');

    if(evento.detail == 1){
      senha?.setAttribute('type', 'text');
    }else{
      senha?.removeAttribute('text');
      senha?.setAttribute('type', 'text');


    }
 }

 }

