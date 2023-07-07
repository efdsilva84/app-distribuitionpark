import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { Registros } from '../models/registros';
import { StorageService } from '../services/storage.service';
import { RegistrosService } from '../services/registros.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-saida',
  templateUrl: './modal-saida.page.html',
  styleUrls: ['./modal-saida.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ModalSaidaPage implements OnInit {
  listaRg:any =[];
  usuario: any =[];
  listaRecuper:any=[];
  dadosGeral:any=[];
  handlerMessage = '';
  roleMessage = '';
  public id_rg:any;
  public registro = new Registros();
  dadosAtualiza!: FormGroup;
  public perfil:any;
  public listaRgs:any=[]
  obj:any
  public age:any;
  nome_inquilino: any;
  fGroup!: FormGroup;
  public tiporg:any;

  public user ={
    name: 'ed',
    email:'efdsilva@hotmail.com',
    password: '123456',
    description: ''
  }


   constructor(private modalCtrl:ModalController, private storage: StorageService, private rg: RegistrosService, private navParams: NavParams,
    private loadingCtrl: LoadingController, private toast: ToastService, private router: Router, private fBuilder: FormBuilder, private location: Location
    ) {
     this.obj = this.navParams.get('objeto');
      console.log("meu obj passado", this.obj);

    this.usuario =  this.storage.get('user').then( async usuario=>{
      this.age = usuario.nome;
      this.tiporg = this.obj.tipo_registro
      console.log("nome do inquilino no ngOnInit", this.age);
      this.fGroup = this.fBuilder.group({
        'id':[this.obj.id_rg],
        'nome_aut_inquilino':[this.age],
        'placa_exit':[null,Validators.compose([])],
        'dados_cont_saida':[null],
        'n_cont_saida':[null],
        'lcr_saida':[null],
        'lcr_saidaa':[null, Validators.compose([ Validators.required])],
        'estado_saida':[false, Validators.compose([])]
      });
  });




     }

async ionViewDidEnter() {

      //this.registrosDia();
  }

   ngOnInit(){
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }
  handleRefresh(evento:any) {
    setTimeout(() => {
      this.registrosDia();
      evento.target.complete();
    }, 2000);
  }

  async addDados(){
    const loader = await this.loadingCtrl.create({
      message: 'Enviando Autorização...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();

      this.rg.enviarPortaria(this.fGroup.value).subscribe((data:any)=>{
        console.log("enviado a portaria", data);

        if(data.error === false){
          this.toast.showSucess("Error");
        this.dismiss();
        }else if(data.error === true){
          this.toast.showSucess("Autorização enviada a portaria");
          this.fGroup.reset();
          this.dismiss();

          window.location.reload();

          this.router.navigateByUrl('registro-dia');

         // this.registrosDia();



        }

      });



  }

  async registrosDia(){
    const loader = await this.loadingCtrl.create({
      message: 'Atualizando ...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();

    this.rg.buscaRgEntradaDia().subscribe(async (data:any)=>{
        console.log("registro dia deopois do envio a portaria", data);
    })

  }

  _vericaCheck(evento: any){
    var pl = document.getElementById("saida_car");
    var dados_car = document.getElementById("dados_car");
    var n_cont = document.getElementById("n_car");
    var l_car = document.getElementById("lcr_car");
    var l_carr = document.getElementById("lcr_carr")
    console.log(evento);
    if(evento.detail.checked == true){

      if(evento.detail.checked == true){
        console.log("somente cavalo");
        pl?.setAttribute("disabled", "disabled");
        dados_car?.setAttribute("disabled", "disabled");
        n_cont?.setAttribute("disabled", "disabled");
        l_car?.setAttribute("disabled", "disabled");
        l_carr?.setAttribute("disabled", "disabled");

      }else{
        console.log("com cavalo");
        pl?.removeAttribute("disabled");
        dados_car?.removeAttribute("disabled");
        n_cont?.removeAttribute("disabled");
        l_car?.removeAttribute("disabled");
        l_carr?.removeAttribute("disabled");



      }


    }else{


    }


  }

}
