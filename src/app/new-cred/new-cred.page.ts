import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { RegistrosService } from '../services/registros.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-cred',
  templateUrl: './new-cred.page.html',
  styleUrls: ['./new-cred.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class NewCredPage implements OnInit {
  listaTipo:any=[];
  listaFun:any=[];
  listaCar:any=[];
  listaEmpresas:any=[];
  listaAcessos:any=[];
  credTemp?: string;

  constructor(private rg: RegistrosService, private loadingCtrl: LoadingController, private toast: ToastService, private router: Router) { }

  ngOnInit() {
    this.buscaFunc();
    this.getVeiculos();
    this.getEmpresas();
    this.getAcessos();
  }

  buscaFunc(){
    this.rg.buscaFunc().subscribe((data:any)=>{

      console.log("todos os funcionarios",data);

      this.listaFun = data.data;
    });
  }
  getVeiculos(){
    this.rg.getAllVeiculos().subscribe((data:any)=>{
      if(data == " "){
        console.log("lista vazia");
      }else{
        this.listaCar = data.data;
        console.log('todos os carros',data);

      }

    });
  }
  getEmpresas(){
    this.rg.buscarEmpresas().subscribe((data:any)=>{
       this.listaEmpresas = data.data;
         console.log("empresas", this.listaEmpresas);
    });
   }

   getAcessos(){
    this.rg.buscarAcesso().subscribe((data:any)=>{
        this.listaAcessos = data.data;
          console.log("tipos de acesso", this.listaAcessos);
    });
  }
  _credTemporaria(evento: any){
    console.log(evento);
    if(evento.detail.checked === true){
      this.credTemp = "sim"
      console.log(this.credTemp);
    }else if(evento.detail.checked === false){
      this.credTemp = "não"
      console.log(this.credTemp);



    }


  }
  dadosCred = new FormGroup({
    n_cred: new FormControl('', [Validators.required]),
    fk_funcionario: new FormControl('', [Validators.required]),
    id_veiculo_func: new FormControl('', [Validators.required]),
    cnh_func: new FormControl('', [Validators.required]),
    id_empresa_func: new FormControl('', [Validators.required]),
    id_tipo_acesso: new FormControl('', [Validators.required]),
    temp: new FormControl(false,[])
  });







  async cadcred(item:any){
   /* console.log(this.dadosCred.value.n_cred);*/
    const params = {n_cred:this.dadosCred.value.n_cred}
    console.log(params);
    this.rg.verificaCredencial(params).subscribe(async (data:any)=>{
      if(data.error === true){
        console.log(data);
        this.toast.showError(data.message);
      }else{
        console.log(this.dadosCred.value);

        const loader = await this.loadingCtrl.create({
          message: 'Aguarde...',
          spinner: 'crescent',
          duration: 2000,
          showBackdrop: true,
        });
        await loader.present();

     this.rg.cadCredencial(this.dadosCred.value).subscribe(async (data:any)=>{
      if(data.error === false){
        this.toast.showSucess(data.message);
          this.atualizaCar();
          this.atualizaFunc();


       // this.router.navigate(['new-users']);

      }else{
        console.log("error");

      }
    });
      }});

  }
  nova(){
    this.router.navigate(['new-users']);
  }
  cred(){
    this.router.navigate(['credenciais']);
  }

  async atualizaCar(){
   // console.log(this.dadosCred.value.id_veiculo_func);
    const paramns = {id: this.dadosCred.value.id_veiculo_func}
    console.log(paramns);
    this.rg.atualizaStatusCar(paramns).subscribe(async (data:any)=>{
      console.log(data);
    });
  }

  async atualizaFunc(){

    const paramns = {id: this.dadosCred.value.fk_funcionario}
    console.log(paramns);
    this.rg.atualizaStatusFunc(paramns).subscribe(async (data:any)=>{
      console.log(data);
    });

  }

}
