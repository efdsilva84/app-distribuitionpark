import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [
    IonicModule.forRoot(),
    ReactiveFormsModule, // Para trabalhar com Reactive Forms Rapha
    FormsModule,
    HttpClientModule, AuthModule

  ],

  providers: [

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HttpClient
    // {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [],
  exports: []

})
export class AppModule { }
