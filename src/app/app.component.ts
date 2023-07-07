import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, HttpClientModule],
})
export class AppComponent {
  constructor(private storage: StorageService, private router: Router, private loadingCtrl: LoadingController
    ) {
      this.initializeApp();
    }





  async initializeApp(){
    console.log("logado inicial");
    await this.storage.criarArmazenamento();
    this.carregaApp();


  }


  async carregaApp(){
    const loader = await this.loadingCtrl.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();

    let user = await this.storage.get('user');

    if(user){
      if(user.perfil === "portaria"){
        console.log("usuario logado");
        this.router.navigate(['home']);
      }else if(user.perfil === "inquilino"){

        this.router.navigate(['registros-dia']);
      }

    }else{
      console.log("nã logado");
      this.router.navigate(['login']);
    }
  }
}
