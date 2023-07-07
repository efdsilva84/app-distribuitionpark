import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'rg-entrada',
    loadComponent: () => import('./rg-entrada/rg-entrada.page').then( m => m.RgEntradaPage)
  },
  {
    path: 'modal-carreta',
    loadComponent: () => import('./modal-carreta/modal-carreta.page').then( m => m.ModalCarretaPage)
  },
  {
    path: 'modal-containers',
    loadComponent: () => import('./modal-containers/modal-containers.page').then( m => m.ModalContainersPage)
  },
  {
    path: 'modal-uber',
    loadComponent: () => import('./modal-uber/modal-uber.page').then( m => m.ModalUberPage)
  },
  {
    path: 'modal-bau',
    loadComponent: () => import('./modal-bau/modal-bau.page').then( m => m.ModalBauPage)
  },
  {
    path: 'registros-dia',
    loadComponent: () => import('./registros-dia/registros-dia.page').then( m => m.RegistrosDiaPage)
  },
  {
    path: 'modal-saida',
    loadComponent: () => import('./modal-saida/modal-saida.page').then( m => m.ModalSaidaPage)
  },
  {
    path: 'credenciais',
    loadComponent: () => import('./credenciais/credenciais.page').then( m => m.CredenciaisPage)
  },
  {
    path: 'new-users',
    loadComponent: () => import('./new-users/new-users.page').then( m => m.NewUsersPage)
  },
  {
    path: 'new-cred',
    loadComponent: () => import('./new-cred/new-cred.page').then( m => m.NewCredPage)
  },
  {
    path: 'new-car',
    loadComponent: () => import('./new-car/new-car.page').then( m => m.NewCarPage)
  },
  {
    path: 'credenciais-list-dia',
    loadComponent: () => import('./credenciais-list-dia/credenciais-list-dia.page').then( m => m.CredenciaisListDiaPage)
  }
];
