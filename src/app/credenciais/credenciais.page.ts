import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { Credenciais } from '../models/credenciais';
import { RegistrosService } from '../services/registros.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credenciais',
  templateUrl: './credenciais.page.html',
  styleUrls: ['./credenciais.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CredenciaisPage implements OnInit {

    allCredenciais: Credenciais[] = [];
    listaCredencias: Credenciais[]=[];
    searchTerm : string = "";
    usuario:any=[];

    url_img = this.api.url_sistema + "/assets/images/"



  constructor(private rg: RegistrosService, private toast: ToastService, private api:ApiService, private storage:StorageService,
    private loadingCtrl: LoadingController, private router: Router
    ) { }

  async ngOnInit() {
    this.usuario = await this.storage.get('user');

    this.todasCred();
  }

  todasCred(){
    this.rg.getAllCredencias().subscribe((data:any)=>{
      if(data.error == true){
        this.toast.showError(data.message);
      }
      this.allCredenciais = data.data;
      this.listaCredencias = data.data;

      console.log("todas as credencais", this.listaCredencias);

    });

  }
  ver(){
    this.router.navigate(['credenciais-list-dia']);


  }
  back(){
    this.router.navigateByUrl('home');
  }

  search(e: Event): void{
    const target = e.target as HTMLInputElement
    const value = target.value
    this.listaCredencias = this.allCredenciais.filter((lista:any) =>{
      return lista.n_cred.toLowerCase().includes(value)
    });

  }
  async entrada2(item:any){
    console.log("meu item", item);

    const loader = await this.loadingCtrl.create({
      message: 'Aguarde...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();
    const dados = {id_user: this.usuario.id,
      id_credencial: item.id_credencial, id_fun: item.id_fun,
      id_veiculo: item.id_veiculo, cnh_func: item.cnh_func,
      id_empresa_func: item.id_empresa_func, id_tipo_acesso: item.id_tipo_acesso,
      n_cred: item.n_cred
      }
      console.log("dados", dados);
    this.rg.rgEntradaCredencial(dados).subscribe((data:any)=>{
      console.log(data);
    })

  }

  async entrada(item:any){
    console.log("meu item", item);

    const loader = await this.loadingCtrl.create({
      message: 'Aguarde...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();

    const params ={id:item.id_veiculo}
    console.log("params", params);
    this.rg.verificaIdVeiculo(params).subscribe(async(data:any)=>{
      console.log(data);
        if(data.error === false ){
          const dados = {id_user: this.usuario.id,
           id_credencial: item.id_credencial,
             fk_funcionario: item.fk_funcionario,
           id_veiculo: item.id_veiculo, cnh_func: item.cnh_func,
          id_empresa_func: item.id_empresa_func, id_tipo_acesso: item.id_tipo_acesso,
         n_cred: item.n_cred
            }
            console.log(dados);
          this.rg.rgEntradaCredencial(dados).subscribe(async (data:any)=>{
            console.log('registrada',data);
              this.toast.showSucess(data.message);
              this.todasCred();
          });
        }else{
          this.toast.showError(data.message);
          this.todasCred();

        }

      /*if(data.error === false){
        const dados = {id_user: this.usuario.id,
          id_credencial: item.id_credencial, id_fun: item.id_fun,
          id_veiculo: item.id_veiculo, cnh_func: item.cnh_func,
          id_empresa_func: item.id_empresa_func, id_tipo_acesso: item.id_tipo_acesso,
          n_cred: item.n_cred
          }
          this.rg.rgEntradaCredencial(dados).subscribe((data:any)=>{
            console.log("resposta entrada cred", data);

          })

        this.rg.rgEntradaCredencial(dados).subscribe(async (data:any)=>{
            console.log("dados da cred", data);

          })

        this.todasCred();

      }else{
        this.toast.showError(data.message);


      }*/

    });
  }

  enviarDadosCred(item:any){
        const params = {id_user: this.usuario.id,
    id_credencial: item.id_credencial, id_fun: item.id_fun,
    id_veiculo: item.id_veiculo, cnh_func: item.cnh_func,
    id_empresa_func: item.id_empresa_func, id_tipo_acesso: item.id_tipo_acesso,
    n_cred: item.n_cred
    }

    console.log("enviar dado cred", params);

    this.rg.cadCredencial(params).subscribe((data:any)=>{
      console.log("entrada", data);
    })

  }

  async saida2(item:any){
    console.log("meu item", item);
    const loader = await this.loadingCtrl.create({
      message: 'Registrando saida...',
      spinner: 'crescent',
      duration: 1000,
      showBackdrop: true,
    });
    await loader.present();
    const params ={id:item.id_veiculo}
    console.log("params", params);
    this.rg.verificaIdVeiculo(params).subscribe((data:any)=>{
          console.log("data fa vunção saida2", data);
          if(data.error === true){
            const dados ={
              id_user_exit: this.usuario.id,
              id:item.id_credencial
            }
            this.rg.updateSaidaCred(dados).subscribe((data:any)=>{

              console.log("saida registrada, saida 2", data);
              this.toast.showError("Saida registrada com sucesso");
              this.todasCred();

            });
          }else if(data.error === false){
            this.toast.showError("Credencial não possui registro de entrada");
            this.todasCred();
          }

    })

  }

async saida(item:any){
  console.log("meu item", item);
  const loader = await this.loadingCtrl.create({
    message: 'Registrando...',
    spinner: 'crescent',
    duration: 2000,
    showBackdrop: true,
  });
  await loader.present();
  const params ={
    id_user_exit: this.usuario.id,
    id:item.id_credencial
  }
  console.log('params saida', params);
  this.rg.updateSaidaCred(params).subscribe((data:any)=>{
    if(data.error === true){
        console.log("error",data.error)
        this.toast.showError("Saida registrada com Sucesso !");
        this.todasCred();

    }else{
      this.toast.showSucess(data.message);

    }

  })

}

async addUsuarios(){
  this.router.navigate(['new-users']);
}

}
