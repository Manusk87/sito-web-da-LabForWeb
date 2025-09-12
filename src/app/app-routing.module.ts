import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DettaglioProdottoComponent } from './componenti/dettaglio-prodotto/dettaglio-prodotto.component';
import { ProdottiComponent } from './componenti/prodotti/prodotti.component';
import { HomePageComponent } from './componenti/home-page/home-page.component';
import { CarrelloComponent } from './componenti/carrello/carrello.component';

import { CheckoutComponent } from './componenti/checkout/checkout.component';
import { ThankYouPageComponent } from './componenti/thank-you-page/thank-you-page.component';

const routes: Routes = [ 
  
  { path: '', component: HomePageComponent },

  { path: 'prodotti', component: ProdottiComponent,  runGuardsAndResolvers: 'always'},
 
  { path: 'dettaglio-prodotti/:id', component: DettaglioProdottoComponent},

  { path: 'carrello', component : CarrelloComponent},

  { path: 'checkout', component : CheckoutComponent},

  { path: 'thankyoupage', component : ThankYouPageComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'top'
  })],
   // imports: [RouterModule.forRoot(routes, { useHash: true })], // cosi angular non cerca i file in sottocartelle al aggiornamento della rotta secondaria //
  exports: [RouterModule]
})
export class AppRoutingModule { }
