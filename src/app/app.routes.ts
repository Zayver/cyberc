import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('@components/home/home.component').then(m => m.HomeComponent),
        title: 'Inicio - CyberDenuncias'
    },
    {
        path: 'complaint',
        loadComponent: ()=> import('@components/complaint/complaint.component').then(m => m.ComplaintComponent),
        title: 'Realizar denuncia - CyberDenuncias'
    },

    {
        path: '**',
        loadComponent: ()=> import('@components/shared/error/e404/e404.component').then(m => m.E404Component),
        title: 'No encontrado'
    }
];
