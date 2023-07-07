import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistrosService } from '../services/registros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credenciais-list-dia',
  templateUrl: './credenciais-list-dia.page.html',
  styleUrls: ['./credenciais-list-dia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CredenciaisListDiaPage implements OnInit {
  lista:any;

  constructor(private rg: RegistrosService, private router: Router) { }

  ngOnInit() {

  }

  back(){
    this.router.navigateByUrl('credenciais');
  }

  async ionViewDidEnter() {
    this.rg.todasEntradasCredDia().subscribe((data:any)=>{
      console.log(data);
      this.lista = data.data;
       this.lista.map((item:any)=>{
         item.date_open = new Date(item.date_open).toLocaleDateString('pt-BR');
         item.date_exit = new Date(item.date_exit).toLocaleDateString('pt-Br');
       });
       this.lista = data.data;

    });


  }


}
