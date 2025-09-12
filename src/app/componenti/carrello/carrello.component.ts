import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CarrelloService } from '../../services/carrello.service';
import { Router } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';

interface GalleryItem {
  id: number,
  name: string,
  price: number,
  sizes: string[],
  description: string,
  image2: string[],
  src: string,
  alt: string;
}

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.scss'
})
export class CarrelloComponent implements OnInit {
  cart: any[] = [];

  filteredSuggestions: string[] = [];

   searchTerm: string = '';

  constructor(private carrelloService: CarrelloService,
              private router : Router,
              private ProdottiService: ProdottiService ) {
    
  }

  ngOnInit() {
    // Aggiorna il carrello ogni volta che il componente viene caricato
    this.cart = this.carrelloService.getCart();
  }

 allSuggestions: string[] = [
    'Nike Air',
    'Nike Jordan',
    "Nike Force",
    "Nike React"
  ];

phrases: string[] = [
  'Spedizione gratuita per ordini superiori a 50€',
  'Nuova collezione estiva disponibile ora',
  'Sconti fino al 30% solo per oggi!',
  'Resi facili entro 30 giorni'
];

// SCROLLBAR PROPERTIES
@ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

images: GalleryItem[] = [
    { id: 10 ,
      name: "Nike Air VaporMax Plus",
      image2: [
        '/assets/immagini3/img10/shopping6.webp',
        '/assets/immagini3/img10/shopping3.webp',
        '/assets/immagini3/img10/shopping4.webp',
        '/assets/immagini3/img10/shopping2.webp',
        '/assets/immagini3/img10/shopping5.webp'
      ],
      src: 'assets/immagini3/img10/shopping6.webp',
      price: 209.99,
      description:  "Le Nike Air VaporMax Plus offrono un'esperienza di corsa leggera e reattiva grazie all'unità VaporMax a tutta lunghezza.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: "Nike Air VaporMax Plus" },
    { id: 14, 
      name: "Nike Blazer Mid '77 Vintage",
      image2: [
        '/assets/immagini3/img14/shopping5.webp',
        '/assets/immagini3/img14/shopping3.webp',
        '/assets/immagini3/img14/shopping4.webp',
        '/assets/immagini3/img14/shopping2.webp',
        '/assets/immagini3/img14/shopping6.webp'
      ],
      src: 'assets/immagini3/img14/shopping5.webp',
      price: 99.99,
      description: "Le Nike Blazer Mid '77 Vintage sono sneakers retrò con uno stile distintivo e una tomaia in pelle premium.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Placeholder 2' },
    { id: 16,  
      name: "Nike Air Zoom SuperRep 2",
      image2: [
        'assets/immagini3/img16/shopping5.webp',
        'assets/immagini3/img16/shopping3.webp',
        'assets/immagini3/img16/shopping4.webp',
        'assets/immagini3/img16/shopping2.webp',
        'assets/immagini3/img16/shopping6.webp'
      ], 
      src:  'assets/immagini3/img16/shopping5.webp',
      price: 129.99,
      description: "Le Nike Air Zoom SuperRep 2 sono scarpe da training con ammortizzazione reattiva e supporto per gli allenamenti più intensi.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Placeholder 3' },
    { id: 38,
       name: "Nike Air Zoom Alphafly NEXT%",
       image2: [
        'assets/immagini3/img38/shopping6.webp',
        'assets/immagini3/img38/shopping3.webp',
        'assets/immagini3/img38/shopping4.webp',
        'assets/immagini3/img38/shopping2.webp',
        'assets/immagini3/img38/shopping5.webp'
      ], 
       src: 'assets/immagini3/img38/shopping6.webp',
       price: 249.99,
       description: "Le Nike Air Zoom Alphafly NEXT% sono le scarpe da maratona più avanzate mai realizzate, progettate per la massima prestazione.",
       sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
       alt: 'Placeholder 4' },
    { id: 16, 
      name: "Nike Air Zoom SuperRep 2",
      image2: [
        'assets/immagini3/img16/shopping5.webp',
        'assets/immagini3/img16/shopping3.webp',
        'assets/immagini3/img16/shopping4.webp',
        'assets/immagini3/img16/shopping2.webp',
        'assets/immagini3/img16/shopping6.webp'
      ], 
      src: 'assets/immagini3/img16/shopping5.webp',
      price: 129.99,
      description: "Le Nike Air Zoom SuperRep 2 sono scarpe da training con ammortizzazione reattiva e supporto per gli allenamenti più intensi.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Placeholder 5' },
    { id: 49, 
      name: "Nike Air Max Axis",
      image2:[
        'assets/immagini3/img49/shopping5.webp',
        'assets/immagini3/img49/shopping3.webp',
        'assets/immagini3/img49/shopping4.webp',
        'assets/immagini3/img49/shopping2.webp',
        'assets/immagini3/img49/shopping1.webp'
      ], 
      src: 'assets/immagini3/img49/shopping5.webp',
      price: 99.99,
      description: "Le Nike Air Max Axis sono scarpe da corsa ispirate al design degli anni '90, con un'ammortizzazione Air Max e uno stile retrò.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Placeholder 6' }
  ];

  progress = 0;

  removeFromCart(index: number) {
    this.carrelloService.removeFromCart(index);
    this.cart = this.carrelloService.getCart(); // Aggiorna la vista locale
  }

  updateQuantity(index: number, quantity: number) {
    this.carrelloService.updateQuantity(index, quantity);
  }

  getTotal() {
    return this.carrelloService.getTotal();
  }
  
  procediAlPagamento(): void {
    this.router.navigate(['/checkout']);
  }

  procediConPayPal(): void {
    // Implementazione per il pagamento con PayPal
    console.log('Procedendo con PayPal...');
    // Qui si può aggiungere l'integrazione con PayPal SDK
    // Per ora reindirizza al checkout
    this.router.navigate(['/checkout']);
  }

  increaseQuantity(index: number): void {
    if (this.cart[index]) {
      const newQuantity = (this.cart[index].quantity || 1) + 1;
      this.carrelloService.updateQuantity(index, newQuantity);
      this.cart = this.carrelloService.getCart(); // Aggiorna la vista locale
    }
  }

  decreaseQuantity(index: number): void {
    if (this.cart[index]) {
      if (this.cart[index].quantity > 1) {
        const newQuantity = this.cart[index].quantity - 1;
        this.carrelloService.updateQuantity(index, newQuantity);
        this.cart = this.carrelloService.getCart(); // Aggiorna la vista locale
      } else {
        // Se la quantità è 1, rimuovi l'articolo dal carrello
        this.removeFromCart(index);
      }
    }
  }

  toggleFavorite(index: number): void {
    const product = this.cart[index];
    if (product) {
      product.isFavorite = !product.isFavorite;
      // Qui potresti aggiungere logica per salvare i preferiti
      console.log('Prodotto', product.name, product.isFavorite ? 'aggiunto ai' : 'rimosso dai', 'preferiti');
    }
  }

  continueShopping(): void {
    this.router.navigate(['/prodotti']);
  }

  onSearchTermChange(term: string) {
  this.searchTerm = term;

  // Solo se il termine non è vuoto, applica il filtro
  if (term.trim()) {
    this.ProdottiService.filtraProdotti(term);
  }
  // Se è vuoto, mantieni i risultati precedenti

  const term2 = term.trim().toLowerCase();
  this.filteredSuggestions = this.allSuggestions.filter(s =>
    s.toLowerCase().includes(term2)
  );
}

  // SCROLLBAR METHODS
  onScroll() {
    this.updateProgress();
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement;
    const imageWrapper = container.querySelector('.image-wrapper') as HTMLElement;
    if (imageWrapper) {
      const computedStyle = window.getComputedStyle(container);
      const gap = parseInt(computedStyle.gap) || 20;
      const scrollAmount = imageWrapper.offsetWidth + gap;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: 620, behavior: 'smooth' }); // fallback
    }
  }

  scrollLeft() {
    const container = this.scrollContainer.nativeElement;
    const imageWrapper = container.querySelector('.image-wrapper') as HTMLElement;
    if (imageWrapper) {
      const computedStyle = window.getComputedStyle(container);
      const gap = parseInt(computedStyle.gap) || 20;
      const scrollAmount = imageWrapper.offsetWidth + gap;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -620, behavior: 'smooth' }); // fallback
    }
  }

  private updateProgress() {
    const el = this.scrollContainer.nativeElement;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    this.progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
  }

  onBuyGalleryItem(item: GalleryItem) {
    // Cerca il prodotto corrispondente a questo item (ad esempio tramite id o nome)
    const prodottoCompleto = this.ProdottiService.getAllProducts().find(p => p.id === item.id);

    if (prodottoCompleto) {
      this.ProdottiService.setSelectedProduct(prodottoCompleto);
      this.router.navigate(['/dettaglio-prodotti', prodottoCompleto.id]);
    } else {
      console.error('Prodotto non trovato per GalleryItem', item);
    }
  }

}
