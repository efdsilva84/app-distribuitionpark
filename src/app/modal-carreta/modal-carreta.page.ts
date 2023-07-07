import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { RegistrosService } from '../services/registros.service';
import { Registros } from '../models/registros';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-modal-carreta',
  templateUrl: './modal-carreta.page.html',
  styleUrls: ['./modal-carreta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule ]
})
export class ModalCarretaPage implements OnInit {
  listaEmpresas: any =[];
  listaEstado: any =[];
  usuario: any =[];
  user:any;
  listaRegistros:any =[];

  public registro = new Registros();

  url_img = this.api.url_sistema + "/assets/images/"


  constructor(private rg: RegistrosService,
    private fBuilder: FormBuilder,
    private loadingCtrl: LoadingController, private modalCtrl: ModalController, private toast: ToastService, private router: Router,
    private storage: StorageService, private api: ApiService) {



  }

  async ionViewDidEnter() {
    this.usuario = await this.storage.get('user');
    console.log("usuario recuperado", this.usuario);
    this.dadosForm.patchValue({id_user:this.usuario.id});

  }
  async segmentChanged(event:any){

  }



  ngOnInit() {
    this.getEmpresas();
    this.buscaEstadoCarros();

  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  dadosForm = this.fBuilder.group({
    id_user: this.usuario.id,
    mot: new FormControl('',[Validators.required]),
    cnh_mot: new FormControl(null,[Validators.required]),
    empresa_mot: new FormControl('',[Validators.required]),
    destino_mot: new FormControl('',[Validators.required]),
    placa_cv: new FormControl('',[Validators.required]),
    estado: new FormControl(false,[]),
    placa_carreta: new FormControl('',[]),
    lacres: new FormControl(false,[]),

  });

  get cnh_mot(){
    return this.dadosForm.get('cnh_mot')!;
  }

  async getEmpresas(){
    this.rg.buscaInquilinos().subscribe((data:any)=>{
        this.listaEmpresas = data.data;
        console.log("lista empreas", this.listaEmpresas);
    })
  }

  _vericaCheckCavalo(evento: any){
    console.log(evento);
    var cavalo = document.getElementById("itemcarreta");
    var vazia = document.getElementById("itemvazia");
    var item = document.getElementById("itemlacres");
    var pl = document.getElementById("lc");

    if(evento.detail.checked == true){
      console.log("somente cavalo");
      cavalo?.setAttribute("disabled", "disabled");
      vazia?.setAttribute("disabled", "disabled");
      item?.setAttribute("disabled", "disabled");
      pl?.setAttribute("disabled", "disabled");

    }else{
      console.log("com cavalo");
      cavalo?.removeAttribute("disabled");
      vazia?.removeAttribute("disabled");
      item?.removeAttribute("disabled");
      pl?.removeAttribute("disabled");


    }


  }

  _vericaCheck(evento: any){
    console.log(event);
    if(evento.detail.checked == true){
      console.log("somente cavalo")
    }else{
      console.log("carreta e cavalo")
    }


  }

  _getSelectItem(selectItem:any){
      console.log(selectItem);

  }



  buscaEstadoCarros(){
    this.rg.buscaEstadoVeiculos().subscribe((data:any)=>{
      console.log(data.data);
      this.listaEstado = data.data;
    })
  }

  async registrar(){
    if(this.dadosForm.invalid){
      return;
    }
    console.log("Submit", this.dadosForm.value, this.usuario.id);
    const loader = await this.loadingCtrl.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();

   this.rg.salvarRg(this.dadosForm.value).subscribe(async (data:any)=>{
        console.log("salvo", data.error);
        loader.dismiss();

        if(data.error == false){
          this.toast.showSucess("Registro Salvo com Sucesso!");
          this.listaRegistros = data;
          await this.storage.set('registros', this.listaRegistros);
          this.dadosForm.reset();
          this.ionViewDidEnter();
        }else{
          this.toast.showError("Ocorreu um Erro");
        }

    });

  }


  verficaLacre(evento:any){
    console.log(evento);
      var lacre = document.getElementById("lc");
      if(evento.detail.checked == true){
        lacre?.setAttribute("disabled", "disabled");
      }else{
        lacre?.removeAttribute("disabled");
      }


  }



}
