import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
 private products: any[] = [];
  private nome: string = '';
  
  // Subject per notificare i cambiamenti del carrello
  private cartUpdated = new Subject<number>();
  public cartUpdated$ = this.cartUpdated.asObservable();

  setProducts(products: any[], nome: string) {
    this.products = products;
    this.nome = nome;

    localStorage.setItem('filteredProducts', JSON.stringify(products));
    localStorage.setItem('filteredNome', nome);
  }
 getProducts(): any[] {
    // Se la memoria è vuota, leggo da localStorage
    if (this.products.length === 0) {
      const stored = localStorage.getItem('filteredProducts');
      this.products = stored ? JSON.parse(stored) : [];
    }
    return this.products;
  }
  getNome(): string {
    // Se la memoria è vuota, leggo da localStorage
    if (!this.nome) {
      const stored = localStorage.getItem('filteredNome');
      this.nome = stored ? stored : '';
    }
    return this.nome;
  }

  clear() {
    this.products = [];
    this.nome = '';
    localStorage.removeItem('filteredProducts');
    localStorage.removeItem('filteredNome');
  }
  //      //       //
  private cart: any[] = [];

  constructor() {
    // Carica il carrello dal localStorage al momento dell'inizializzazione
    this.loadCartFromStorage();
  }

  // Carica il carrello dal localStorage
  private loadCartFromStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  // Salva il carrello nel localStorage
  private saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

// Ottieni i dati dal carrello


  addToCart(product: any) {
    const existingProductIndex = this.cart.findIndex(
      (item) => item.id === product.id && item.size === product.size && item.color === product.color
    );

    if (existingProductIndex >= 0) {
      // Se il prodotto esiste già nel carrello, aumentiamo la quantità
      this.cart[existingProductIndex].quantity++;
    } else {
      // Se il prodotto non esiste, lo aggiungiamo
      this.cart.push({ ...product, quantity: 1 });
    }
    
    // Salva il carrello aggiornato nel localStorage
    this.saveCartToStorage();
    
    // Notifica i componenti del cambiamento
    this.cartUpdated.next(this.getCartItemCount());
  }

  getCart() {
    return this.cart;
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    // Salva il carrello aggiornato nel localStorage
    this.saveCartToStorage();
    
    // Notifica i componenti del cambiamento
    this.cartUpdated.next(this.getCartItemCount());
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(index);
    } else {
      this.cart[index].quantity = quantity;
      // Salva il carrello aggiornato nel localStorage
      this.saveCartToStorage();
      
      // Notifica i componenti del cambiamento
      this.cartUpdated.next(this.getCartItemCount());
    }
  }
  svuotaCarrello(): void {
    this.cart = [];
    // Rimuovi il carrello dal localStorage
    localStorage.removeItem('cart');
    
    // Notifica i componenti del cambiamento
    this.cartUpdated.next(this.getCartItemCount());
  }
  getTotal() {
    return this.cart.reduce((sum, product) => sum + (product.price * product.quantity), 0).toFixed(2);
  }

  // Ottieni il numero totale di articoli nel carrello
  getCartItemCount(): number {
    return this.cart.reduce((count, product) => count + (product.quantity || 1), 0);
  }
}
