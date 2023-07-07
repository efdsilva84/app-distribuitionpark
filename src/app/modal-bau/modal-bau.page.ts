import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { RegistrosService } from '../services/registros.service';
import { ToastService } from '../services/toast.service';
import { StorageService } from '../services/storage.service';
import { Registros } from '../models/registros';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-bau',
  templateUrl: './modal-bau.page.html',
  styleUrls: ['./modal-bau.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class ModalBauPage implements OnInit {

  listaEmpresas: any =[];
  usuario: any =[];
  user:any;

  public registro = new Registros();

  constructor(private rg: RegistrosService,
    private fBuilder: FormBuilder,
    private loadingCtrl: LoadingController, private modalCtrl: ModalController, private toast: ToastService, private router: Router,
    private storage: StorageService) {


  }

  ngOnInit() {
    this.getEmpresas();
  }

  async ionViewDidEnter() {
    this.usuario = await this.storage.get('user');
    console.log("usuario recuperado", this.usuario);
    this.dadosForm.patchValue({id_user:this.usuario.id});

  }
  dismiss(){
    this.modalCtrl.dismiss();
  }

  async registrarBau(){
    console.log("Submit", this.dadosForm.value, this.usuario.id);
    const loader = await this.loadingCtrl.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();
    this.rg.salvaBau(this.dadosForm.value).subscribe((data:any)=>{
      console.log("salvo", data.error);
      loader.dismiss();

          if(data.error == false){
            this.toast.showSucess("Registro Salvo com Sucesso!");
            this.dadosForm.reset();

          }else{
            this.toast.showError("Ocorreu um Erro");
          }
    })

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
    cnh_mot: [null, Validators.compose([
      Validators.required
    ])],
    empresa_mot: new FormControl('',[Validators.required]),
    placa_cv: new FormControl('',[Validators.required]),
    destino_mot: new FormControl('',[Validators.required]),
    lacres: new FormControl('',[Validators.required]),

  });

}
