import { Component,viewChild, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { CarrelloService } from '../../services/carrello.service';
import { ProdottiService } from '../../services/prodotti.service';
import { product } from '../../type/prodotti.type';


interface SubMenuItem {
  title: string;
  links: string[];
}

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

interface MenuItem {
  id: string;
  label: string;
  subMenu: SubMenuItem[];
}
@Component({
  selector: 'app-dettaglio-prodotto',
  templateUrl: './dettaglio-prodotto.component.html',
  styleUrl:  './dettaglio-prodotto.component.scss'
})
export class DettaglioProdottoComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription = new Subscription();
  product: product[] = [];

  prodottiFiltrati: product[] = []; 

  filteredSuggestions: string[] = [];

  nome: string = '';

  searchTerm: string = '';

  sortOption: string = '';

  showFilters = true;


   @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;


    // input di ricerca //
   
  showOverlay = false;
  hideOverlay() {
    this.showOverlay = false;
  }

  // input di ricerca //

// NAV //

  activeSubmenuId: string | null = null;
  megaOpen = false;
  hideTimeout: any = null;

  showSubmenu(id: string) {
    this.activeSubmenuId = id;
    this.megaOpen = true;
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  tryHideSubmenu() {
    this.hideTimeout = setTimeout(() => {
      // Verifica se mouse è sopra un li o il mega-wrapper
      const hoveredLi = document.querySelectorAll('.menu > li:hover').length > 0;
      const megaWrapper = document.querySelector('.mega-wrapper');
      const megaHovered = megaWrapper ? megaWrapper.matches(':hover') : false;

      if (!hoveredLi && !megaHovered) {
        this.megaOpen = false;
        this.activeSubmenuId = null;
      }
    }, 100);
  }

  cancelHide() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }
// INIZIO MENU//

   menuItems: MenuItem[] = [

    {
      id: 'Novita e in evidenza',
      label: 'Novita e in evidenza',
      subMenu: [
        {
          title: 'In evidenza',
          links: ['Tutti i nuovi arrivi', 
                  'Best seller',
                  'Calendario dei lanci SNKRS', 
                  'I must-have per il rientro a scuola', 
                  'Look ispirati al calcio', 
                  'Divise dei club']
        },
        {
          title:  'Acquista le icone',
          links: ['Air Force 1', 
                  'Air Jordan 1',
                  'Air Max', 
                  'Dunk', 
                  'Pegasus', 
                  'Mercurial']
        },
          {
          title:  'Jordan',
          links: ['Tutti gli articoli Jordan', 
                  'Novità del mese', 
                  'Jordan Streetwear', 
                  'Jordan Basketball',  
                  'Jordan Golf',
                  'Jordan x PSG']
        },
          {
          title:  'Scopri lo sport',
          links: ['Calcio', 
                  'Running', 
                  'Basket',
                  'Fitness e training', 
                  'Golf',  
                  'Tennis',  
                  'Yoga', 
                  'Danza', 
                  'Skateboard']
        },
      ]
    },
        {
      id: 'Uomo',
      label: 'Uomo',
      subMenu: [
        {
          title:  'In evidenza',
          links: ['Novità',
                  'Best seller', 
                  'Calendario dei lanci SNKRS',
                  'Sneakers rétro ispirate al running',
                  'I must-have per il rientro a scuola',
                  'Look ispirati al calcio']
        },
        {
          title:  'Scarpe',
          links: ['Tutte le scarpe',
                  'Lifestyle', 
                  'Jordan',
                  'Running',
                  'Calcio',
                  'Basket', 
                  'Fitness e training',
                  'Skateboard',
                  'Nike By You']
        },
          {
          title:  'Abbigliamento',
          links: ["Tutto l'abbigliamento",
                  'Maglie e t-shirt', 
                  'Felpe', 
                  'Shorts', 
                  'Tute', 
                  'Pantaloni e tights', 
                  'Giacche', 
                  'Divise e maglie', 
                  'Articoli per il mare e la spiaggia']
        },
          {
          title:  'Scopri lo sport',
          links: ['Running',
                  'Calcio', 
                  'Basket', 
                  'Fitness e training', 
                  'Tennis', 
                  'Golf', 
                  'Rugby']
        },
         {
          title:  'Accessori',
          links: ['Tutti gli accessori',
                  'Borse e zaini',
                  'Copricapi',
                  'Calze', ]
        },
      ]
    },
       {
      id: 'Donna',
      label: 'Donna',
      subMenu: [
        {
          title:  'In evidenza',
          links: ['Novità', 
                  'Best seller', 
                  'Calendario dei lanci SNKRS',
                  'Lasciati ispirare: Nike Style By',
                  'I must-have per il rientro a scuola', 
                  'I modelli di punta del pack',]
        },
        {
          title:  'Scarpe',
          links: ['Tutte le scarpe',
                  'Lifestyle', 
                  'Jordan',
                  'Running',
                  'Fitness e training',
                  'Calcio',
                  'Nike By You']
        },
          {
          title:  'Abbigliamento',
          links: ["Tutto l'abbigliamento",
                  'Maglie e t-shirt', 
                  'Felpe', 
                  'Shorts', 
                  'Leggings', 
                  'Pantaloni', 
                  'Set coordinati', 
                  'Reggiseni sportivi', 
                  'Articoli per il mare e la spiaggia']
        },
          {
          title:  'Scopri lo sport',
          links: ['Fitness e training',
                  'Running',
                  'Calcio', 
                  'Basket', 
                  'Tennis', 
                  'Yoga', 
                  'Golf']
        },
         {
          title:  'Accessori',
          links: ['Tutti gli accessori',
                  'Borse e zaini',
                  'Copricapi',
                  'Calze', ]
        },
      ]
    },
       {
      id: 'Kids',
      label: 'Kids',
      subMenu: [
        {
          title:  'In evidenza',
          links: ['Novità', 
                  'Best seller', 
                  'Teenager',
                  'I must-have per il rientro a scuola']
        },
        {
          title:  'Scarpe',
          links: ['Tutte le scarpe',
                  'Lifestyle', 
                  'Jordan',
                  'Calcio',
                  'Running',
                  'Basket']
        },
          {
          title:  'Abbigliamento',
          links: ["Tutto l'abbigliamento",
                  'Maglie e t-shirt', 
                  'Felpe', 
                  'tute', 
                  'Abbigliamento sportivo', 
                  'Shorts', 
                  'Pantaloni e leggings', 
                  'Giacche', 
                  'Divise e maglie']
        },
          {
          title:  'Kids per età',
          links: ['Ragazzo/a (7-15 anni)',
                  'Bambino/a (3-7 anni)',
                  'Bebè e bimbo/a (0-3 anni)']
        },
         {
          title:  'Accessori',
          links: ['Tutti gli accessori',
                  'Borse e zaini',
                  'Copricapi',
                  'Calze', ]
        },
      ]
    }, 
  ];

// FINE MENU //

 
      constructor( private router : Router, 
                   private carrelloService: CarrelloService,
                   private route: ActivatedRoute, 
                   private ProdottiService: ProdottiService
                  ) {
    //  const navigation = window.history.state;
     // this.product = navigation.product;
    }

// INIZIO INPUT DI RICERCA //


 allSuggestions: string[] = [    // nomi chiave dei prodotti inseriti a sinistra della finestra di ricerca dell'input //
    'Nike Air',
    'Jordan',
    "Zoom",
    "Force",
    "React"
  
  ];

  

  showSearchOverlay() {
    this.showOverlay = true;

   setTimeout(() => {
      this.searchInput?.nativeElement.focus();
    });

  }


  isMatch(char: string): boolean {
    return this.searchTerm.toLowerCase().includes(char.toLowerCase());
  }


viewProduct(product: product) {
  this.ProdottiService.setSelectedProduct(product);
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  this.router.navigate(['/dettaglio-prodotto', product.id]);
}
clearSearch() {
    this.searchTerm = '';
    // Usa setTimeout per assicurarti che l'input sia aggiornato prima di mettere il focus
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    });
  }

  onSuggestionClick(suggestion: string) {
  this.searchTerm = suggestion;
  /*this.filterProducts();*/

// this.carrelloService.setProducts(this.filteredProducts, suggestion);
 this.showOverlay = false; // chiude overlay

  this.router.navigate(['/prodotti']);
}
// FINE INPUT DI RICERCA //
phrases: string[] = [
  'Spedizione gratuita per ordini superiori a 50€',
  'Nuova collezione estiva disponibile ora',
  'Sconti fino al 30% solo per oggi!',
  'Resi facili entro 30 giorni'
];
// INIZIO CARRELLO //
   /* product: any;
    showWarning: boolean = false; */
  selectedColor: string = '';
  showCartPopup: boolean = false;
  cartItemCount: number = 0;
  

  
    addToCart() {
      if (this.selectedSize && this.selectedColor && this.selectedProduct) {
        this.carrelloService.addToCart({
          ...this.selectedProduct,
          id: this.selectedProduct.id,
          size: this.selectedSize,
          color: this.selectedColor
        });
        alert(`${this.selectedProduct.name} aggiunto al carrello!`);
        this.router.navigate(['/carrello']);
      } else {
        this.showWarning = true;
      }
    }



    productId: number = 0;
    productName: string = '';
    productImage: string = '';
   /* ngOnInit2(): void {
      // Recupera l'ID dal parametro della rotta
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.productId = +id;  // Converti l'ID in numero
        // Trova il prodotto corrispondente (nel caso di un prodotto unico, usiamo direttamente l'oggetto)
        if (this.productId === this.product.id) {
          this.productName = this.product.name;
          this.productImage = this.product.image;
        }
      }
    }*/
    // FINE CARRELLO //


// INIZIO SCROLLBAR //

@ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

images: GalleryItem[] = [
    { id: 35 ,
      name: "Nike Air Max Plus",
      image2: [
        '/assets/immagini3/img35/shopping5.webp',
        '/assets/immagini3/img35/shopping3.webp',
        '/assets/immagini3/img35/shopping4.webp',
        '/assets/immagini3/img35/shopping2.webp',
        '/assets/immagini3/img35/shopping6.webp'
      ],
      src: 'assets/immagini3/img35/shopping5.webp',
      price: 169.99,
      description:  "Le Nike Air Max Plus sono sneakers iconiche con un design audace e un'ammortizzazione Max Air per il massimo comfort.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: "Nike Air Max Plus" },
    { id: 24, 
      name:  "Nike Air Max 270 React",
      image2: [
        '/assets/immagini3/img24/shopping6.webp',
        '/assets/immagini3/img24/shopping3.webp',
        '/assets/immagini3/img24/shopping4.webp',
        '/assets/immagini3/img24/shopping2.webp',
        '/assets/immagini3/img24/shopping5.webp'
      ],
      src: 'assets/immagini3/img24/shopping6.webp',
      price: 159.99,
      description: "Le Nike Air Max 270 React uniscono il comfort dell'unità Air Max con la reattività della tecnologia React.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Placeholder 2' },
    { id: 42,  
      name: "Nike Air Zoom Victory",
      image2: [
        'assets/immagini3/img42/shopping6.webp',
        'assets/immagini3/img42/shopping3.webp',
        'assets/immagini3/img42/shopping4.webp',
        'assets/immagini3/img42/shopping2.webp',
        'assets/immagini3/img42/shopping5.webp'
      ], 
      src:  'assets/immagini3/img42/shopping6.webp',
      price: 179.99,
      description: "Le Nike Air Zoom Victory sono scarpe da corsa progettate per la velocità e il comfort, ideali per le gare su strada.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Placeholder 3' },
    { id: 37,
       name: "Nike Air Force 1 Low",
       image2: [
        'assets/immagini3/img37/shopping5.webp',
        'assets/immagini3/img37/shopping3.webp',
        'assets/immagini3/img37/shopping4.webp',
        'assets/immagini3/img37/shopping2.webp',
        'assets/immagini3/img37/shopping6.webp'
      ], 
       src: 'assets/immagini3/img37/shopping5.webp',
       price: 109.99,
       description: "Le Nike Air Force 1 Low sono un classico intramontabile, ideali per un look casual e confortevole.",
       sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
       alt: 'Placeholder 4' },
    { id: 26, 
      name: "Nike React Infinity Run Flyknit 2",
      image2: [
        'assets/immagini3/img26/shopping6.webp',
        'assets/immagini3/img26/shopping3.webp',
        'assets/immagini3/img26/shopping4.webp',
        'assets/immagini3/img26/shopping2.webp',
        'assets/immagini3/img26/shopping5.webp'
      ], 
      src: 'assets/immagini3/img26/shopping6.webp',
      price: 169.99,
      description: "Le Nike Air Zoom Wildhorse 7 sono scarpe da golf progettate per la massima trazione e stabilità su terreni accidentati.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Placeholder 5' },
    { id: 40, 
      name: "Nike Air Max Plus 2",
      image2:[
        'assets/immagini3/img40/shopping6.webp',
        'assets/immagini3/img40/shopping3.webp',
        'assets/immagini3/img40/shopping4.webp',
        'assets/immagini3/img40/shopping2.webp',
        'assets/immagini3/img40/shopping5.webp'
      ], 
      src: 'assets/immagini3/img40/shopping6.webp',
      price: 179.99,
      description:"Le Nike Air Max Plus 2 sono il rinnovamento delle iconiche Air Max Plus, con un'ammortizzazione Max Air e uno stile unico.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Placeholder 6' }
  ];


  progress = 0;

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






selectedSize: string= '';
sizeError: boolean = false;
selectedProduct: product | null = null;
showWarning: boolean = false;
  selectedImage: string = '';
  currentImageIndex: number = 0;
// ngOnInit del body //

onSearchChange(term: string) {
  const filtro = term.trim().toLowerCase();
  this.ProdottiService.filtraProdotti(filtro);

  this.filteredSuggestions = this.allSuggestions.filter(s =>
    s.toLowerCase().includes(filtro)
  );
}

resetSearch() {
  this.searchTerm = '';
  this.filteredSuggestions = [];
  // Non chiamiamo filtraProdotti('') per mantenere i risultati precedenti
}
ngOnInit(): void {
  // Scroll immediato al top della pagina
  this.scrollToTop();
  
  // Sottoscrivi ai cambiamenti dei parametri della rotta
  this.routeSubscription = this.route.paramMap.subscribe(params => {
    const id = +params.get('id')!;
    
    if (id) {
      // Cerca il prodotto usando l'ID dalla rotta
      const all = this.ProdottiService.getAllProducts();
      this.selectedProduct = all.find(p => p.id === id) || null;
      
      if (this.selectedProduct) {
        // Salva il prodotto selezionato nel servizio
        this.ProdottiService.setSelectedProduct(this.selectedProduct);
        
        // Imposta l'immagine selezionata
        this.selectedImage = this.selectedProduct.image2?.[0] ?? '';
        
        // Gestisci il colore dai query parameters
        this.route.queryParams.subscribe(queryParams => {
          if (queryParams['color']) {
            this.selectedColor = queryParams['color'];
          }
        });
        this.currentImageIndex = 0;
        
        console.log('[DettaglioProdotto] Prodotto caricato:', this.selectedProduct.name);
        
        // Scroll aggiuntivo dopo il caricamento del prodotto
        this.scrollToTop();
      } else {
        console.warn('❗ Prodotto non trovato per ID:', id);
        // this.router.navigate(['/prodotti']);
      }
    }
  });

  // Recupera e applica il filtro se presente
  const filtro = this.ProdottiService.getCurrentFilterTerm();
  if (filtro) {
    this.searchTerm = filtro;
    this.ProdottiService.filtraProdotti(filtro);
  }
}

ngOnDestroy(): void {
  // Pulisci la sottoscrizione per evitare memory leak
  if (this.routeSubscription) {
    this.routeSubscription.unsubscribe();
  }
}

// Metodo per scroll immediato al top
private scrollToTop(): void {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

  // ngOnInit dell'input di ricerca //
  selectImage(img: string) {
    if (!this.selectedProduct) return;  // controllo che selectedProduct esista
  
    this.selectedImage = img;
    this.currentImageIndex = this.selectedProduct.image2.indexOf(img);
  }
  
  prevImage() {
    if (!this.selectedProduct) return;
  
    const imgs = this.selectedProduct.image2;
    this.currentImageIndex = (this.currentImageIndex - 1 + imgs.length) % imgs.length;
    this.selectedImage = imgs[this.currentImageIndex];
  }
  
  nextImage() {
    if (!this.selectedProduct) return;
  
    const imgs = this.selectedProduct.image2;
    this.currentImageIndex = (this.currentImageIndex + 1) % imgs.length;
    this.selectedImage = imgs[this.currentImageIndex];
  }
  /*addToCart(): void {
    alert('Prodotto aggiunto al carrello!');
  }*/

  addToFavorites(): void {
    alert('Prodotto aggiunto ai preferiti!');
  }
selectSize(size: string): void {
  this.selectedSize = size;
  this.sizeError = false; // Rimuove il bordo rosso se l'utente seleziona una taglia
}

addToCart2(): void {
  if (!this.selectedSize) {
    this.sizeError = true;  // Attiva il bordo rosso solo al click senza selezione
    return;
  }

  if (!this.selectedProduct) {
    alert('Errore: prodotto non trovato');
    return;
  }

  // Azione quando la taglia è selezionata
  this.carrelloService.addToCart({
    ...this.selectedProduct,
    id: this.selectedProduct.id,
    size: this.selectedSize,
    color: this.selectedColor || 'Default'
  });
  
  // Aggiorna il conteggio del carrello e mostra il popup
  this.cartItemCount = this.carrelloService.getCart().length;
  this.showCartPopup = true;
  
  // Nascondi il popup dopo 5 secondi
  setTimeout(() => {
    this.showCartPopup = false;
  }, 5000);
}

// Metodi per gestire il popup del carrello
goToCart(): void {
  this.showCartPopup = false;
  this.router.navigate(['/carrello']);
}

goToCheckout(): void {
  this.showCartPopup = false;
  this.router.navigate(['/checkout']);
}

closeCartPopup(): void {
  this.showCartPopup = false;
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
  }










 
 
 
 
 
 
 
 
 
 
 
 

 
  