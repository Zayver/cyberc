import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { loginGuard } from '@guards/login.guard';

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
        path: 'login',
        canActivate: [loginGuard],
        loadComponent: ()=> import('@components/login/login.component').then(m => m.LoginComponent),
        title: "Iniciar sesión - CyberDenuncias"
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        loadComponent: ()=> import('@components/admin/admin.component').then(m => m.AdminComponent),
        children: [
            {
                path:'',
                loadComponent: ()=> import('@components/admin/list-complaints/list-complaints.component').then(m => m.ListComplaintsComponent),
                title: 'Listado de denuncias - CyberDenuncias'
            }
        ]
    },

    {
        path: '**',
        loadComponent: ()=> import('@components/shared/error/e404/e404.component').then(m => m.E404Component),
        title: 'No encontrado'
    }
];
