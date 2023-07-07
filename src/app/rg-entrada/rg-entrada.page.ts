import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-rg-entrada',
  templateUrl: './rg-entrada.page.html',
  styleUrls: ['./rg-entrada.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RgEntradaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
