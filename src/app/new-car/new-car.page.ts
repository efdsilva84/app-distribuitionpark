import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { RegistrosService } from '../services/registros.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.page.html',
  styleUrls: ['./new-car.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class NewCarPage implements OnInit {
  listaTipo: any=[];

  constructor(private toast: ToastService, private loadingCtrl: LoadingController, private router: Router, private rg: RegistrosService  ) { }

  ngOnInit() {
    this.getTipo();
  }

  dadosCar = new FormGroup({
    fk_tipo_veiculo: new FormControl('', [Validators.required]),
    marca_veiculo: new FormControl('', [Validators.required]),
    modelo_veiculo: new FormControl('', [Validators.required]),
    cor_veiculo: new FormControl('', [Validators.required]),
    placa_veiculo: new FormControl('', [Validators.required]),
  });


  async salvarVeiculo(item:any){
    const loader = await this.loadingCtrl.create({
      message: 'Registrando...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();
    this.rg.novoVeiculo(this.dadosCar.value).subscribe((data:any)=>{
      console.log(data);

      if(data.error === false){
        this.toast.showSucess(data.message);
        this.router.navigate(['new-cred']);

      }else{
        this.toast.showError("algo errado");
      }
    })


  }

  getTipo(){
    this.rg.tipoVeiculo().subscribe((data:any)=>{
        this.listaTipo = data.data;
          console.log("lista tipos", this.listaTipo);
    });
  }

}
