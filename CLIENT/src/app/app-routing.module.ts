import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { TavoliComponent } from "./tavoli/tavoli.component";
import { OrdiniComponent } from "./ordini/ordini.component";
import { MenuComponent } from "./menu/menu.component";
import { CarrelloComponent } from "./carrello/carrello.component";
import { PiattiComponent } from "./piatti/piatti.component";
import { DispensaComponent } from "./dispensa/dispensa.component";


const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'tavoli', component: TavoliComponent},
  {path: 'ordini', component: OrdiniComponent},
  {path: 'carrello', component: CarrelloComponent},
  {path: 'piatti', component: PiattiComponent},
  {path: 'dispensa', component: DispensaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
