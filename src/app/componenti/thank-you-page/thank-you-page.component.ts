import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarrelloService } from '../../services/carrello.service';

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrl: './thank-you-page.component.scss'
})
export class ThankYouPageComponent {
  cart: any[] = [];
  orderNumber: string;
  orderDate: string;
  shippingType: string = 'standard'; // Default shipping type
  
  constructor(public carrelloService: CarrelloService, private router : Router) {
    // Recupera i dati del carrello dal localStorage se disponibili
    const savedCart = localStorage.getItem('orderCart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      localStorage.removeItem('orderCart'); // Rimuovi dopo l'uso
    } else {
      this.cart = this.carrelloService.getCart();
    }
    
    this.orderNumber = this.generateOrderNumber();
    this.orderDate = this.getCurrentDate();
    
    // Recupera il tipo di spedizione dal localStorage se disponibile
    const savedShippingType = localStorage.getItem('orderShippingType');
    if (savedShippingType) {
      this.shippingType = savedShippingType;
      localStorage.removeItem('orderShippingType'); // Rimuovi dopo l'uso
    }
  }

  // Genera un numero d'ordine casuale
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `LAB${timestamp}${random}`;
  }

  // Ottiene la data corrente formattata
  getCurrentDate(): string {
    const now = new Date();
    return now.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Calcola il subtotale dell'ordine
  getSubtotal(): string {
    const subtotal = this.cart.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    return subtotal.toFixed(2);
  }

  // Calcola il costo di spedizione
  getShippingCost(): string {
    if (this.shippingType === 'express') {
      return '9.99';
    }
    return '0.00';
  }

  // Calcola il totale dell'ordine con spedizione
  getOrderTotal(): string {
    const subtotal = parseFloat(this.getSubtotal());
    const shipping = parseFloat(this.getShippingCost());
    return (subtotal + shipping).toFixed(2);
  }

  // Naviga alla homepage
  navigateToHome() {
    this.router.navigate(['/']);
  }

  // Naviga al carrello
  navigateToCart() {
    this.router.navigate(['/carrello']);
  }
}
