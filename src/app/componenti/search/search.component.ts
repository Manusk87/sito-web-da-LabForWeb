import { Component, EventEmitter,ViewChild, ElementRef, Input, Output, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';
import { CarrelloService } from '../../services/carrello.service';
import { product } from '../../type/prodotti.type';
import { Subscription } from 'rxjs';

interface SubMenuItem {
  title: string;
  links: string[];
}

interface MenuItem {
  id: string;
  label: string;
  subMenu: SubMenuItem[];
}


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnChanges, OnInit, OnDestroy {
  private cartSubscription: Subscription = new Subscription();

  prodottiFiltrati: product[] = [];

    showOverlay = false;

     @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
    

  @Input() searchTerm: string = '';
  @Input() suggestions: string[] = [];
  
  // Termini di ricerca più popolari
  popularSearchTerms: string[] = ['Force', 'Sequent', 'Running', 'Zoom', 'Basket', 'Air Max', 'Jordan', 'React'];

  @Output() searchTermChange = new EventEmitter<string>();

  // Proprietà per preferiti e carrello
  isFavorite: boolean = false;
  cartItemCount: number = 0;
  selectedProduct: product | null = null;

  // Proprietà per la sidebar
  isSidebarOpen: boolean = false;
  
  // Proprietà per la navigazione a livelli
  currentLevel: 'main' | 'submenu' | 'subsubmenu' = 'main';
  currentMenuItem: MenuItem | undefined = undefined;
  currentSubMenuItem: SubMenuItem | undefined = undefined;
  navigationHistory: Array<{level: string, item?: MenuItem, subItem?: SubMenuItem}> = [];

  constructor(private ProdottiService: ProdottiService, private router: Router, private carrelloService: CarrelloService) {}



  filteredSuggestions: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm']) {
      this.filterSuggestions();
    }
  }

onInputChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  this.searchTerm = value;
  this.searchTermChange.emit(this.searchTerm); 
  
  // Solo se il valore non è vuoto, applica il filtro
  if (value.trim()) {
    this.ProdottiService.filtraProdotti(value);
  }
  // Se è vuoto, mantieni i risultati precedenti senza chiamare filtraProdotti
  
  this.filterSuggestions(); 
}

  filterSuggestions() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredSuggestions = this.suggestions.filter(s =>
      s.toLowerCase().includes(term)
    );
  }

viewProduct(product: product) {
  console.log('Visualizzazione prodotto:', product);
  // Imposta il prodotto selezionato per i preferiti
  this.selectedProduct = product;
  this.ProdottiService.setSelectedProduct(product);   // Salva il prodotto selezionato nel servizio o localStorage

  localStorage.setItem('selectedProduct', JSON.stringify(product));

  this.router.navigate(['/dettaglio-prodotti', product.id]);   // Naviga alla pagina dettaglio usando l'id
  
  // Chiudi l'overlay di ricerca
  this.hideOverlay();
}

goToProductDetail(id: any) {
  this.router.navigate(['/dettaglio-prodotti', id],  ); // Naviga al dettaglio del prodotto
}
  selectSuggestion(suggestion: string) {
    this.searchTerm = suggestion;
    this.filteredSuggestions = [];
    this.searchTermChange.emit(this.searchTerm);
  }

 clearSearch() {
    this.searchTerm = '';
    this.filteredSuggestions = [];
    this.searchTermChange.emit(this.searchTerm);
    // Non chiamiamo filtraProdotti('') per mantenere i risultati precedenti
  }


 showSearchOverlay() {   // il puntatore del mouse va in automatico nell'input desiderato //
    this.showOverlay = true;

    
    setTimeout(() => {
      this.searchInput?.nativeElement.focus();
    });
  }

  isMatch(char: string): boolean {
    return this.searchTerm.toLowerCase().includes(char.toLowerCase());
  }

  onSuggestionClick(suggestion: string) {
  this.searchTerm = suggestion;
  this.searchTermChange.emit(this.searchTerm);
  
  // Applica il filtro dei prodotti con il suggerimento selezionato
  this.ProdottiService.filtraProdotti(suggestion);
  
  this.ProdottiService.setProducts(this.prodottiFiltrati, suggestion);
  this.showOverlay = false; // chiude overlay

  this.router.navigate(['/prodotti']);
}

// Gestisce il click su un termine di ricerca popolare
onPopularTermClick(term: string) {
  this.searchTerm = term;
  this.searchTermChange.emit(this.searchTerm);
  
  // Applica il filtro dei prodotti con il termine selezionato
  this.ProdottiService.filtraProdotti(term);
  
  this.ProdottiService.setProducts(this.prodottiFiltrati, term);
  this.showOverlay = false; // chiude overlay

  this.router.navigate(['/prodotti']);
}
 hideOverlay() {

    this.showOverlay = false;
    this.showOverlay = false;
    this.searchTerm = '';

  }

// INIZIO NAV //

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

  ngOnInit() {
  // Carica l'ultimo filtro dal servizio
  this.searchTerm = this.ProdottiService.getCurrentFilterTerm();

  // Sottoscrivi ai prodotti filtrati per aggiornare la lista in tempo reale
  this.ProdottiService.prodottiFiltrati$.subscribe(products => {
    this.prodottiFiltrati = products;
  });

  // Se c'è filtro, filtra
  if (this.searchTerm) {
    this.ProdottiService.filtraProdotti(this.searchTerm);
  }
  // Se non c'è filtro, mantieni i risultati precedenti senza resettare
  
  // Carica il contatore del carrello dal servizio
  this.updateCartCount();
  
  // Sottoscrivi ai cambiamenti del carrello
  this.cartSubscription = this.carrelloService.cartUpdated$.subscribe(
    (cartCount: number) => {
      this.cartItemCount = cartCount;
    }
  );
}

//  FINE NAV //


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

  navigateToHome() {
    this.router.navigate(['/']);
  }

  // Funzione per gestire i preferiti
  toggleFavorites() {
    if (this.selectedProduct) {
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite) {
        // Logica per aggiungere ai preferiti
        console.log('Prodotto aggiunto ai preferiti:', this.selectedProduct);
        // Qui puoi implementare la logica per salvare nei preferiti
      } else {
        // Logica per rimuovere dai preferiti
        console.log('Prodotto rimosso dai preferiti:', this.selectedProduct);
        // Qui puoi implementare la logica per rimuovere dai preferiti
      }
    } else {
      // Se non c'è un prodotto selezionato, mostra un messaggio o apri la lista preferiti
      console.log('Nessun prodotto selezionato per i preferiti');
      // Potresti navigare alla pagina dei preferiti
    }
  }

  // Funzione per navigare al carrello
  navigateToCart() {
    this.router.navigate(['/carrello']);
  }

  // Funzione per aggiornare il contatore del carrello
  updateCartCount() {
    this.cartItemCount = this.carrelloService.getCartItemCount();
  }

  // Funzione per aggiungere un prodotto al carrello
  addToCart(product: product) {
    // Aggiungi il prodotto al carrello tramite il servizio
    this.carrelloService.addToCart(product);
    
    // Aggiorna il contatore
    this.updateCartCount();
    
    // Log per debug
    console.log('Prodotto aggiunto al carrello:', product);
    console.log('Totale articoli nel carrello:', this.cartItemCount);
    
    // Feedback visivo (opzionale)
    this.showCartFeedback();
  }

  // Funzione per mostrare feedback visivo quando si aggiunge al carrello
  showCartFeedback() {
    // Qui puoi aggiungere logica per mostrare un toast o animazione
    console.log('Articolo aggiunto al carrello!');
  }
  
  ngOnDestroy() {
    // Pulisci la sottoscrizione per evitare memory leaks
    this.cartSubscription.unsubscribe();
  }

  // Metodi per gestire la sidebar
  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    this.resetNavigation();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Metodi per la navigazione multi-livello
  navigateToSubmenu(item: MenuItem) {
    this.navigationHistory.push({level: this.currentLevel, item: this.currentMenuItem, subItem: this.currentSubMenuItem});
    this.currentLevel = 'submenu';
    this.currentMenuItem = item;
    this.currentSubMenuItem = undefined;
  }

  navigateToSubSubmenu(subItem: SubMenuItem) {
    this.navigationHistory.push({level: this.currentLevel, item: this.currentMenuItem, subItem: this.currentSubMenuItem});
    this.currentLevel = 'subsubmenu';
    this.currentSubMenuItem = subItem;
  }

  navigateBack() {
    const previous = this.navigationHistory.pop();
    if (previous) {
      this.currentLevel = previous.level as 'main' | 'submenu' | 'subsubmenu';
      this.currentMenuItem = previous.item;
      this.currentSubMenuItem = previous.subItem;
    }
  }

  resetNavigation() {
    this.currentLevel = 'main';
    this.currentMenuItem = undefined;
    this.currentSubMenuItem = undefined;
    this.navigationHistory = [];
  }
}