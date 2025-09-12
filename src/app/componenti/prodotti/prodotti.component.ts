import { Component, ViewChild, ElementRef, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service'; 
import { CarrelloService } from '../../services/carrello.service';
import { filter } from 'rxjs/operators';
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




type FilterSection = 'genere' | 'offerte' | 'prezzo' | 'taglie' | 'colori';




@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.scss',
})
export class ProdottiComponent implements OnInit, OnDestroy, AfterViewInit {

  product: product[] = [];

  prodottiFiltrati: product[] = []; 

  filteredSuggestions: string[] = [];

  nome: string = '';

  searchTerm: string = '';

  sortOption: string = '';

  showFilters = true;

  showMobileFiltersModal = false;

  private subscriptions = new Subscription();


   @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('prodottiContainer') prodottiContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('accordionContainer') accordionContainer!: ElementRef<HTMLDivElement>;


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


constructor(private carrelloService: CarrelloService, 
            private router: Router,
            private ProdottiService: ProdottiService,
           
) {}

// inserisco il prodotto scelto nel carrello //
addToCart(product: any) {
  this.carrelloService.addToCart(product);
}
// al click del prodotto scelto mi portera nella pagina di dettaglio prodotti//

viewProduct(product: product) {
  
  this.ProdottiService.setSelectedProduct(product);  // Salva il prodotto selezionato nel servizio o localStorage

  localStorage.setItem('selectedProduct', JSON.stringify(product));
  
  // Ottieni il primo colore selezionato dall'accordion
  const selectedColor = Object.keys(this.selectedColors).find(color => this.selectedColors[color]);
 
  // Naviga alla pagina dettaglio includendo il colore selezionato come query parameter
  const navigationExtras = selectedColor ? { queryParams: { color: selectedColor } } : {};
  this.router.navigate(['/dettaglio-prodotti', product.id], navigationExtras);
}

filtriOpen: Record<FilterSection, boolean> = {
  genere: true,
  offerte: false,
  prezzo: false,
  taglie: false,
  colori: false
};

toggleFilter2(filtro: FilterSection) {
  this.filtriOpen[filtro] = !this.filtriOpen[filtro];
}

toggleMobileFiltersModal() {
  this.showMobileFiltersModal = !this.showMobileFiltersModal;
}

closeMobileFiltersModal() {
  this.showMobileFiltersModal = false;
}

//filteredProducts: any[] = [] = this.dummyProducts;   // tipicizzo e assegno il valore //




toggleFilters() {
  this.showFilters = !this.showFilters;
   
}

// INIZIO INPUT DI RICERCA //


allSuggestions: string[] = [
  'Nike Air',
  'Jordan',
  " Zoom",
  " Force",
  " React",
   "Air Max Sequent"
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
onSearchChange(term: string) {
  const filtro = term.trim().toLowerCase();
  
  // Solo se il filtro non è vuoto, applica il filtro
  if (filtro) {
    this.ProdottiService.filtraProdotti(filtro);
  }
  // Se è vuoto, mantieni i risultati precedenti

  this.filteredSuggestions = this.allSuggestions.filter(s =>
    s.toLowerCase().includes(filtro)
  );
}

resetSearch() {
  this.searchTerm = '';
  this.filteredSuggestions = [];
  // Non chiamiamo filtraProdotti('') per mantenere i risultati precedenti
  // Lasciamo che sia il servizio a gestire i prodotti filtrati tramite l'observable
}

clearSearch(): void {
  this.searchTerm = '';
  this.filteredSuggestions = [];
  // Non chiamiamo filtraProdotti('') per mantenere i risultati precedenti
  // Lasciamo che sia il servizio a gestire i prodotti filtrati
  
  setTimeout(() => {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  });
}
ngOnInit() {
  console.log('[ProdottiComponent] Inizializzazione componente');

  // Scroll immediato all'inizio della pagina
  this.scrollToTop();

  const storedProducts = localStorage.getItem('allProducts');
  const prodotti: product[] = storedProducts ? JSON.parse(storedProducts) : [];

  if (prodotti.length > 0) {
    this.ProdottiService.setAllProducts(prodotti);

    const filtroSalvato = this.ProdottiService.getCurrentFilterTerm();
    const tipoFiltro = this.ProdottiService.getFiltroTipo();

    console.log('[ProdottiComponent] Filtro salvato:', {
      filtroSalvato,
      tipoFiltro
    });

    // Se l'input è vuoto ma c'è un filtro precedente salvato, mantieni il risultato del filtro
    if (!this.searchTerm && filtroSalvato) {
      // Non mostrare il termine di ricerca nell'input se è vuoto
      this.searchTerm = '';
      // Ma mantieni i prodotti filtrati dal filtro precedente
      // Non riapplicare il filtro, lascia che sia il servizio a gestire
    } else {
      // Mantieni il termine di ricerca visualmente solo se non è vuoto
      this.searchTerm = filtroSalvato;
    }
  } else {
    console.log('[ProdottiComponent] Nessun prodotto salvato');
  }

  // Sottoscrizione ai prodotti filtrati con gestione delle subscription
  const prodottiSubscription = this.ProdottiService.prodottiFiltrati$.subscribe(products => {
    const filtroCorrente = this.ProdottiService.getFiltroCorrente();
    const filtroTipo = this.ProdottiService.getFiltroTipo();
    
    console.log('[ProdottiComponent] Ricevuti prodotti filtrati:', {
      count: products.length,
      filtroCorrente: filtroCorrente,
      filtroTipo: filtroTipo
    });

    // Aggiorna il nome in base al tipo di filtro
    if (filtroTipo === 'categoria') {
      this.nome = filtroCorrente;
    } else {
      this.nome = filtroCorrente;
    }

    // Assegna sempre i prodotti filtrati, anche se l'array è vuoto
    // Questo permette al filtro per categoria di funzionare correttamente
    this.prodottiFiltrati = products;
    
    // Scroll aggiuntivo dopo il caricamento dei prodotti
    setTimeout(() => this.scrollToTop(), 0);
  });
  
  this.subscriptions.add(prodottiSubscription);
}

ngAfterViewInit() {
  // Scroll aggiuntivo dopo che la vista è stata inizializzata
  setTimeout(() => this.scrollToTop(), 100);
}

ngOnDestroy() {
  // Pulisci tutte le sottoscrizioni per evitare memory leaks
  this.subscriptions.unsubscribe();
}

private scrollToTop(): void {
  // Scroll immediato alla parte superiore della pagina
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


  onSuggestionClick(suggestion: string) {
  this.searchTerm = suggestion;
  /*this.filterProducts();*/

 this.ProdottiService.setProducts(this.prodottiFiltrati, suggestion);
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

// filtro i prodotti gia filtrati dalla ricerca tramite la select con sortProducts //
sortProducts() {
    switch (this.sortOption) {
      case 'In evidenza':
        // Mostra tutti i prodotti disponibili
        this.prodottiFiltrati = this.ProdottiService.getAllProducts();
        break;

      case 'price-asc':
        this.prodottiFiltrati.sort((a, b) => a.price - b.price);
        break;

      case 'price-desc':
        this.prodottiFiltrati.sort((a, b) => b.price - a.price);
        break;
      }
  
}

//






   // Opzioni filtro
  colorOptions = ['Rosso', 'Blu', 'Nero', 'Bianco'];
  sizeOptions = ['38', '39', '40', '41', '42'];
  priceRanges = [
    { label: 'Inferiore a 50€', value: 'under50' },
    { label: '50 - 100€', value: '50-100' },
    { label: '100 - 150€', value: '100-150' },
    { label: 'Superiore a 150€', value: 'over150' }
  ];

  // Stati filtri selezionati
  selectedColors: { [key: string]: boolean } = {};
  selectedSizes: { [key: string]: boolean } = {};
selectedPrices: string[] = [];
selectedProduct!: product;
  // Accordion open/close


  // Filtra prodotti
get prodottiFiltratiAcc(): product[] {
  const colors = Object.keys(this.selectedColors).filter(c => this.selectedColors[c]);
  const sizes = Object.keys(this.selectedSizes).filter(s => this.selectedSizes[s]);
  const priceRanges = this.selectedPrices; // è un array

  return this.prodottiFiltrati.filter(product => {
    const matchColor = colors.length === 0 || product.colors.some((color: string) =>
      colors.some((f: string) => color.includes(f))
    );

    const matchSize = sizes.length === 0 || product.sizes.some((size: string) =>
      sizes.includes(size)
    );

    // ✅ Prezzo con selezioni multiple
    const price = product.price;

    const matchPrice =
      priceRanges.length === 0 || priceRanges.some(range => {
        switch (range) {
          case 'under50':
            return price < 50;
          case '50-100':
            return price >= 50 && price <= 100;
          case '100-150':
            return price > 100 && price <= 150;
          case 'over150':
            return price > 150;
          default:
            return false;
        }
      });

    return matchColor && matchSize && matchPrice;
  });
}
accordion = {
  colors: false,
  sizes: false,
  prices: false
};
  toggleSection(section: 'colors' | 'sizes' | 'prices') {
    this.accordion[section] = !this.accordion[section];
  }

togglePriceFilter(value: string): void {
  const index = this.selectedPrices.indexOf(value);
  if (index > -1) {
    this.selectedPrices.splice(index, 1); // Rimuove se già presente
  } else {
    this.selectedPrices.push(value); // Aggiunge se non presente
  }
}
getColorHex(color: string): string {
  const colorMap: { [key: string]: string } = {
    'Rosso': '#e53935',
    'Blu': '#1e88e5',
    'Nero': '#212121',
    'Bianco': '#ffffff',
    'Grigio': '#9e9e9e',
    'Verde': '#43a047',
    'Giallo': '#fdd835'
  };
  return colorMap[color] || '#ccc';
}



onSearchTermChange(term: string) {
  this.searchTerm = term;

  this.ProdottiService.filtraProdotti(term);

  const term2 = term.trim().toLowerCase();
  this.filteredSuggestions = this.allSuggestions.filter(s =>
    s.toLowerCase().includes(term2)
  );
}

// SCROLL SINCRONIZZATO ACCORDION
onProdottiScroll() {
  if (this.prodottiContainer && this.accordionContainer) {
    const prodottiEl = this.prodottiContainer.nativeElement;
    const accordionEl = this.accordionContainer.nativeElement;
    
    // Calcola la percentuale di scroll dei prodotti
    const scrollTop = prodottiEl.scrollTop;
    const maxScroll = prodottiEl.scrollHeight - prodottiEl.clientHeight;
    const scrollPercentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
    
    // Applica lo stesso scroll percentuale all'accordion
    const accordionMaxScroll = accordionEl.scrollHeight - accordionEl.clientHeight;
    const accordionScrollTop = scrollPercentage * accordionMaxScroll;
    
    accordionEl.scrollTop = accordionScrollTop;
  }
}

onAccordionScroll() {
  if (this.prodottiContainer && this.accordionContainer) {
    const prodottiEl = this.prodottiContainer.nativeElement;
    const accordionEl = this.accordionContainer.nativeElement;
    
    // Calcola la percentuale di scroll dell'accordion
    const scrollTop = accordionEl.scrollTop;
    const maxScroll = accordionEl.scrollHeight - accordionEl.clientHeight;
    const scrollPercentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
    
    // Applica lo stesso scroll percentuale ai prodotti
    const prodottiMaxScroll = prodottiEl.scrollHeight - prodottiEl.clientHeight;
    const prodottiScrollTop = scrollPercentage * prodottiMaxScroll;
    
    prodottiEl.scrollTop = prodottiScrollTop;
  }
}
}




