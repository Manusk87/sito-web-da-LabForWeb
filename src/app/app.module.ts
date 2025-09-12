import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './componenti/home-page/home-page.component';
import { ProdottiComponent } from './componenti/prodotti/prodotti.component';
import { CheckoutComponent } from './componenti/checkout/checkout.component';
import { ThankYouPageComponent } from './componenti/thank-you-page/thank-you-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DettaglioProdottoComponent } from './componenti/dettaglio-prodotto/dettaglio-prodotto.component';
import { CarrelloComponent } from './componenti/carrello/carrello.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './componenti/search/search.component';
import { FooterComponent } from './componenti/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProdottiComponent,
    CheckoutComponent,
    ThankYouPageComponent,
    DettaglioProdottoComponent,
    CarrelloComponent,
    SearchComponent,
    FooterComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
