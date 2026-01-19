import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { LayoutComponent } from './layout/layout';

export const routes: Routes = [

  { path: '', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./pages/usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES)
      },
      {
        path: 'revistas',
        loadChildren: () =>
          import('./pages/revistas/revistas.routes').then(m => m.REVISTAS_ROUTES)
      },
      {
        path: 'articulos',
        loadChildren: () =>
          import('./pages/articulos/articulos.routes').then(m => m.ARTICULOS_ROUTES)
      },
      {
        path: 'revisiones',
        loadChildren: () =>
          import('./pages/revisiones/revisiones.routes').then(m => m.REVISIONES_ROUTES)
      }
    ]
  }
];
