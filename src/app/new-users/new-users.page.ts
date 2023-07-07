import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { RegistrosService } from '../services/registros.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.page.html',
  styleUrls: ['./new-users.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class NewUsersPage implements OnInit {
  listaEmpresas:any=[];
  listaTipo:any=[];
  listaAcessos:any=[];

  constructor(private rg: RegistrosService, private loadingCtrl: LoadingController, private toast: ToastService, private router:Router) { }

  ngOnInit() {
    this.getEmpresas();
    this.getAcessos();
  }

  async getEmpresas(){
    this.rg.buscaInquilinos().subscribe((data:any)=>{
        this.listaEmpresas = data.data;
        console.log("lista empreas", this.listaEmpresas);
    })
  }


  dadosFunc = new FormGroup({
    nome_func: new FormControl('', [Validators.required]),
    cnh_fun: new FormControl('', []),
    empresa_fun: new FormControl('', [Validators.required]),
    turno_func: new FormControl('', [Validators.required]),
  });


  async novoUser(item:any){
    console.log(this.dadosFunc.value);
    const loader = await this.loadingCtrl.create({
      message: 'Registrando...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();
    this.rg.novoUserCred(this.dadosFunc.value).subscribe((data:any)=>{
      if(data.error === false){
        this.toast.showSucess(data.message);
        this.dadosFunc.reset();
        this.router.navigate(['new-car']);
      }else{
        this.toast.showError("algo errado");
      }

    });
  }
  avante(){
    this.router.navigate(['new-cred']);
  }

  getAcessos(){
    this.rg.buscarAcesso().subscribe((data:any)=>{
        this.listaAcessos = data.data;
          console.log("tipos de acesso", this.listaAcessos);
    });
  }




}
