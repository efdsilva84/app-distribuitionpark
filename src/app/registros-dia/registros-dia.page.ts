import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AlertController, IonicModule, LoadingController, ModalController } from '@ionic/angular';
import { RegistrosService } from '../services/registros.service';
import { StorageService } from '../services/storage.service';
import {  Router } from '@angular/router';
import { Registros } from '../models/registros';
import { ModalSaidaPage } from '../modal-saida/modal-saida.page';
import { ToastService } from '../services/toast.service';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-registros-dia',
  templateUrl: './registros-dia.page.html',
  styleUrls: ['./registros-dia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule ]
})
export class RegistrosDiaPage implements OnInit {
  listaRg:any =[];
  listaRgFiltro:[]=[]
  usuario: any =[];
  listaRecuper:any=[];
  dadosGeral:any=[];
  listaPorEmpresa:any=[];


// curso de angular
  Allregistros: Registros[] = [];
  listaRegistros: Registros[]=[];

  handlerMessage = '';
  roleMessage = '';
  public id_rg:any;
  public registro = new Registros();
  dadosAtualiza!: FormGroup;
  public perfil:any;
  obj:any;
  id:any;
  user:any;


  url_img = this.api.url_sistema + "/assets/images/"


constructor(private rg: RegistrosService, private loadingCtrl: LoadingController, private storage: StorageService,
  private router: Router, private alertController: AlertController,  private fBuilder: FormBuilder, private modalCtrl:ModalController,
  private toast: ToastService, private api: ApiService
  ){

    this.dadosAtualiza = new FormGroup({
      id_rg: new FormControl(this.id_rg,[]),
      id_user: new FormControl(this.usuario.id,[]),
      placa_carreta_saida: new FormControl('',[]),
      lcr_saida: new FormControl('',[])
    });



}

async ionViewDidEnter() {

  this.usuario = await this.storage.get('user');
  console.log('usuario recuperado', this.usuario);
  this.dadosAtualiza.patchValue({id_user:this.usuario.id});
  this.user = this.usuario.perfil;
  this.id = this.usuario.fk_inquilino;


  this.usuario = await this.storage.get('user');
  this.id = this.usuario.fk_inquilino


  if(this.usuario.perfil === 'inquilino'){
    this.rgPorEmpresa(this.id);
  }else if(this.usuario.perfil === 'portaria'){
    this.registrosDia();

  }

}
async ngOnInit() {


}





  isModalOpen = false;

  back(){
    this.router.navigateByUrl('home');
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async showSaida(item:any){
    const modal = await this.modalCtrl.create({
      component: ModalSaidaPage

  });
  await modal.present();
  console.log("item", item)


  }
  async addDados(item:any){
     this.router.navigateByUrl('modal-saida');
   const modal = await this.modalCtrl.create({
      component: ModalSaidaPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        objeto:item
      }
    });
    return await modal.present();

  }
  handleRefresh(evento:any) {
    setTimeout(() => {
      this.registrosDia();
      evento.target.complete();
    }, 2000);
  }

  async addDadoss(){
    //await this.storage.set('obj', item);
    this.router.navigate(['saida-portaria']);
  }

 async rgPorEmpresa(id:any){
  const loader = await this.loadingCtrl.create({
    message: 'por empresa',
    spinner: 'crescent',
    duration: 2000,
    showBackdrop: true,
  });
  await loader.present();
    const  params ={
      id: this.usuario.fk_inquilino
    }
    console.log('id empresa sendo enviado', params);
    this.rg.registrosPorEmpresas(params).subscribe((data:any)=>{
      if(data.error === true){
        this.toast.showError(data.message);
      }else if(data.error === false){
        this.listaPorEmpresa = data.data;
        this.listaPorEmpresa.map((item:any)=>{
          item.data_entrada = new Date(item.data_entrada!).toLocaleDateString(
            'pt-BR'
          );
          item.hora_enviada = new Date(item.hora_enviada).toLocaleDateString('pt-BR');
        });
        this.listaPorEmpresa = data.data;
        console.log('lista por empresa', this.listaPorEmpresa);

        this.Allregistros = data.data;
      }
    });
 }



  async enviaPortaria(item:any){
   // console.log(this.fGroup.value, item.id_rg);
   //console.log(this.dadosAtualiza.value, item.id_rg);
   const params = {
    id:item.id_rg
  }

  console.log(params, this.dadosAtualiza.value);
   this.rg.enviarPortaria(params).subscribe((data:any)=>{

      console.log("enviado e atualizado para portaria", );
      this.registrosDia();
    })


  }

  async registrosDia(){
    const loader = await this.loadingCtrl.create({
      message: 'Aguarde...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();
    this.rg.buscaRgEntradaDia().subscribe(async (data:any)=>{
      if(data.error === true){
        this.toast.showError(data.message);
      }else{
        this.listaPorEmpresa = data.data;
        this.listaPorEmpresa.map((item:any)=>{
          item.data_entrada = new Date(item.data_entrada).toLocaleDateString(
            'pt-BR'
          );

        });
        this.Allregistros = data.data;
        this.listaPorEmpresa = data.data;
        console.log('lista por empresa', this.listaPorEmpresa);

      }
    })

  }

  async registrosDiapos(){
    this.rg.buscaRgEntradaDia().subscribe(async (data:any)=>{
        this.listaRg = data;
        await this.storage.set('rgs', this.listaRg);


        console.log("registro do dia", this.listaRg);
    })

  }

  async registarSaida(item:any){

    const alert = await this.alertController.create({
      header: 'Mensagem',
      message: 'Deseja realmente registar a saída ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: async () => {
            console.log("meu item",item);

            const loader = await this.loadingCtrl.create({
              message: 'Aguarde ...',
              spinner: 'crescent',
              duration: 2000,
              showBackdrop: true,
            });
            await loader.present();
            const params = {
              id:item.id_rg,
             // id_user_saida: this.usuario.id
            }
        console.log(params);

      this.rg.verificaExisteAut(params).subscribe((data:any)=>{
        console.log(data);
          if(data.error === true){
            this.toast.showError(data.message);
          }else{
            const dados = {
              id:item.id_rg,
             id_user_saida: this.usuario.id
            }
            this.rg.registraSaida(dados).subscribe((data:any)=>{
              console.log(data);
              this.toast.showSucess("Saída registrada com sucesso !");
              this.registrosDia();

            });
          }
      });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;

  }

  search(e: Event): void{
    const target = e.target as HTMLInputElement
    const value = target.value
    this.listaPorEmpresa = this.Allregistros.filter((lista:any) =>{
      return lista.placa_cv.toLowerCase().includes(value)
    });

  }

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


}
