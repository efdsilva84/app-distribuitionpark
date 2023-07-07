import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'admin 1234'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  constructor(private api:ApiService) { }

  buscaInquilinos() {
    return this.api.get('cadastros/buscaempresas', false, httpOptions);
  }
  salvarRg(data:any){
    return this.api.post('registros/salvarg', data, httpOptions);

  }
  buscaTipoRg() {
    return this.api.get('registros/tipo_rg', false, httpOptions);
  }
  salvarRgContainer(data:any){
    return this.api.post('registros/salvacontainers', data, httpOptions);

  }
  salvaApps(data:any){
    return this.api.post('registros/salvaapps', data, httpOptions);

  }
  salvaBau(data:any){
    return this.api.post('registros/salvabau', data, httpOptions);

  }
  buscaEstadoVeiculos() {
    return this.api.get('registros/estado', false, httpOptions);
  }
  buscaRgEntradaDia(){
    return this.api.get('registros/registros_dia', false, httpOptions);

  }
  verificaExisteAut(id:any){
    return this.api.get('registros/verifica_aut', id, httpOptions);

  }
  registraSaida(id:any){
    return this.api.get('registros/registrando_saida', id, httpOptions);
  }
  enviarPortaria(id:any){

    return this.api.get('registros/enviando_portaria', id, httpOptions);
  }
  registroSaidas(){
    return this.api.get('registros/exitregistradas', false, httpOptions);
  }
  getAllCredencias(){
    return this.api.get('registros/allcredenciais', false, httpOptions);


  }
  registrosPorEmpresas(data:any){
    return this.api.get('registros/registros_dia_empresa', data, httpOptions);
  }
  rgEntradaCredencial(data:any){
    return this.api.post('registros/opencred', data, httpOptions);
  }

  updateSaidaCred(data:any){
    return this.api.get('registros/updateexitcred', data, httpOptions);

  }
  novoUserCred(data:any){
    return this.api.post('cadastros/novousercredencial', data, httpOptions);

  }

  tipoVeiculo(){
    return this.api.get('cadastros/buscatipo_veiculo', false, httpOptions);

  }
  novoVeiculo(data:any){
    return this.api.post('cadastros/novoveiculos', data, httpOptions);

  }

  buscaFunc(){
    return this.api.get('cadastros/busca_func', false, httpOptions);


  }
  getAllVeiculos(){
    return this.api.get('registros/veiculos_cred', false, httpOptions);

  }
  buscarEmpresas(){
    return this.api.get('cadastros/buscaempresas', false, httpOptions);

  }
  buscarAcesso(){
    return this.api.get('cadastros/buscatipo_acesso', false, httpOptions);

  }
  cadCredencial(data:any){
    return this.api.post('cadastros/novaentrada', data, httpOptions);

  }

  verificaCredencial(data:any){
    return this.api.post('cadastros/verifica_exist', data, httpOptions);

  }
  atualizaStatusCar(data:any){
    return this.api.post('registros/atualizarstatuscar', data, httpOptions);

  }
  atualizaStatusFunc(data:any){
    return this.api.post('registros/atualizarstatusfunc', data, httpOptions);

  }

  verificaIdVeiculo(data:any){
    return this.api.post('registros/verifica_id_veiculo', data, httpOptions);

  }
  todasEntradasCredDia(){
    return this.api.get('cadastros/opencreddia', false, httpOptions);

  }









}
