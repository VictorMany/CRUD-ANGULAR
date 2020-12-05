import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'news', loadChildren: () => import('./news/news.module').then((m) => m.NewsModule) },
  {path: '**', redirectTo: 'news/today'}
  // Comodin en caso de que no existan las rutas
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
