import { ModalUberPage } from './../modal-uber/modal-uber.page';
import { ModalContainersPage } from './../modal-containers/modal-containers.page';
import { ModalCarretaPage } from './../modal-carreta/modal-carreta.page';
import { Storage } from '@ionic/storage-angular';
import { Component } from '@angular/core';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { RegistrosService } from '../services/registros.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { Registros } from '../models/registros';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { ModalBauPage } from '../modal-bau/modal-bau.page';
import { RgEntradaPage } from '../rg-entrada/rg-entrada.page';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class HomePage {
  listaEmpresas: any =[];
  usuario: any =[];
  user:any;
  tiporg:any =[];
  listaRg:any =[];
  handlerMessage = '';
  roleMessage = '';


  public registro = new Registros();

  url_img = this.api.url_sistema + "/assets/images/";


  async ngOnInit() {
    this.getTipoRg();
    this.getEmpresas();

  }
  async ionViewDidEnter() {
    this.usuario = await this.storage.get('user');
    console.log("usuario recuperado", this.usuario);
    this.dadosForm.patchValue({id_user:this.usuario.id});
     if(this.usuario.perfil === 'inquilino'){
       this.router.navigateByUrl('registros-dia');
     }else if(this.usuario.perfil === 'portaria'){
        this.router.navigateByUrl('home');
     }

  }


  constructor(private rg: RegistrosService,
    private fBuilder: FormBuilder,
    private loadingCtrl: LoadingController, private modalCtrl: ModalController, private toast: ToastService, private router: Router, private alertController: AlertController,
    private storage: StorageService, private api:ApiService) {


  }

  dadosForm = this.fBuilder.group({
    tipo_registro: new FormControl('',[Validators.required]),
    id_user: this.usuario.id,
    mot: new FormControl('',[Validators.required]),
    cnh_mot: new FormControl('',[Validators.required]),
    empresa_mot: new FormControl('',[Validators.required]),
    destino_mot: new FormControl('',[Validators.required]),
    placa_cv: new FormControl('',[Validators.required]),
    placa_carreta: new FormControl('',[Validators.required]),
    lacres: new FormControl('',[Validators.required]),

  });







  async logout(){
    const alert = await this.alertController.create({
      header: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Sair',
          role: 'confirm',
          handler: async () => {
            this.handlerMessage = 'Alert confirmed';
            const loader = await this.loadingCtrl.create({
              message: 'Saindo ...',
              spinner: 'crescent',
              duration: 2000,
              showBackdrop: true,
            });
            await loader.present();
            this.storage.remove('user');
            this.router.navigate(['login']);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;

  }

  async getTipoRg(){
    this.rg.buscaTipoRg().subscribe((data:any)=>{
      this.tiporg = data.data
        console.log("tipo dos registros", this.tiporg);
    })
  }
  async getEmpresas(){
    this.rg.buscaInquilinos().subscribe((data:any)=>{
        this.listaEmpresas = data.data;
        console.log("lista empreas", this.listaEmpresas);
    })
  }
  async showModal(){
    const modal = await this.modalCtrl.create({
      component: ModalCarretaPage
  });

  await modal.present();
}

async showKL(){
  const modal = await this.modalCtrl.create({
    component: RgEntradaPage
  });
  await modal.present();

}
async showModalContainer(){
  const modal = await this.modalCtrl.create({
    component: ModalContainersPage
  });
  await modal.present();
}

async showModalUber(){
  const modal = await this.modalCtrl.create({
    component: ModalUberPage
  });
  await modal.present();

}
async showModalBau(){
  const modal = await this.modalCtrl.create({
    component: ModalBauPage
  });
  await modal.present();

}

async registrosEntradaDia(){
    this.router.navigate(['registros-dia']);

}

allCredenciais(){
  this.router.navigate(['credenciais']);
}
}
