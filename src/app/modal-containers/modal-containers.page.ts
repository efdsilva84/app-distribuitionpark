import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { RegistrosService } from '../services/registros.service';
import { StorageService } from '../services/storage.service';
import { Registros } from '../models/registros';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-modal-containers',
  templateUrl: './modal-containers.page.html',
  styleUrls: ['./modal-containers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ModalContainersPage implements OnInit {

  listaEmpresas: any =[];
  usuario: any =[];
  user:any;

  public registro = new Registros();


  constructor(private modalCtrl: ModalController,     private fBuilder: FormBuilder, private rg: RegistrosService,
    private loadingCtrl: LoadingController, private storage: StorageService, private toast: ToastService
    ) { }

    async ionViewDidEnter() {
      this.usuario = await this.storage.get('user');
      console.log("usuario recuperado", this.usuario);
      this.dadosForm.patchValue({id_user:this.usuario.id});

    }

  ngOnInit() {
    this.getEmpresas();
  }
  _vericaCheck(evento: any){
    console.log(evento);
    if(evento.detail.checked == true){
      console.log("vazia")
    }else{
      console.log("cheia")
    }


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
  dismiss(){
    this.modalCtrl.dismiss();
  }

  registrar(){

  }

  async getEmpresas(){
    this.rg.buscaInquilinos().subscribe((data:any)=>{
        this.listaEmpresas = data.data;
        console.log("lista empreas", this.listaEmpresas);
    })
  }

  dadosForm = this.fBuilder.group({
    id_user: this.usuario.id,
    mot: new FormControl('',[Validators.required]),
    cnh_mot: new FormControl('',[Validators.required]),
    empresa_mot: new FormControl('',[Validators.required]),
    dados_cont: new FormControl('',[Validators.required]),
    destino_mot: new FormControl('',[Validators.required]),
    placa_cv: new FormControl('',[Validators.required]),
    estado: new FormControl(false,[]),
    placa_carreta: new FormControl('',[Validators.required]),
    lacres: new FormControl(false,[]),

  });

  async registrarContainer(){

    console.log("Submit", this.dadosForm.value, this.usuario.id);
    const loader = await this.loadingCtrl.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();

   this.rg.salvarRgContainer(this.dadosForm.value).subscribe(async (data:any)=>{
        console.log("salvo", data.error);

        loader.dismiss();

        if(data.error == false){
          this.toast.showSucess("Registro Salvo com Sucesso!");
          this.dadosForm.reset();

        }else{
          this.toast.showError("Ocorreu um Erro");
        }

    });

  }

}
