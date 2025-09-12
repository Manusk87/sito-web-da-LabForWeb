import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProdottiService } from '../../services/prodotti.service';
import { product } from '../../type/prodotti.type';
  interface GalleryItem {
  id: number,
  name: string,
  price: number,
  sizes: string[],
  description: string,
  image2: string[],
  src: string,
  alt: string;
  category?: string; // Aggiungo la proprietà category opzionale
}

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
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent implements AfterViewInit, OnInit, OnDestroy {

  product: product[] = [];

  prodottiFiltrati: product[] = [];

  filteredSuggestions: string[] = [];

  searchTerm: string = '';

  showOverlay = false;

   @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

    // input di ricerca //



  hideOverlay() {
    this.showOverlay = false;


    this.showOverlay = false;
    this.searchTerm = '';
   // this.filteredSuggestions = [];
   // this.filteredProducts = [];
    

  }

  // input di ricerca //

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

//  FINE NAV //

// INIZIO VIDEO//

 @ViewChild('myVideo') videoRef!: ElementRef<HTMLVideoElement>;
 playVideo() {
    // Ulteriore fallback, se necessario
    const video = this.videoRef.nativeElement;
    if (video.paused) {
      video.play().catch(err => {
        console.error('Errore nel fallback di play:', err);
      });
    }
  }

  onButtonClick(): void {
  console.log('Pulsante cliccato!');
  alert('Hai cliccato il pulsante!');
}

// FINE VIDEO //

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

selectedName = '';

showResults = false;  // Controlla la visibilità dei risultati





// Funzione che filtra i prodotti in base al nome

constructor(private router: Router,

            private ProdottiService: ProdottiService
) {}


viewProduct(product: product) {
 
  this.ProdottiService.setSelectedProduct(product);   // Salva il prodotto selezionato nel servizio o localStorage

  localStorage.setItem('selectedProduct', JSON.stringify(product));

  this.router.navigate(['/dettaglio-prodotti', product.id]);   // Naviga alla pagina dettaglio usando l'id
}
goToProductDetail(id: any) {
  this.router.navigate(['/dettaglio-prodotti', id],  ); // Naviga al dettaglio del prodotto
}

// INIZIO SCROLLBAR //

@ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

images: GalleryItem[] = [
    { id: 1 ,
      name: "Nike Air Max 270",
      image2: [
        '/assets/immagini3/img01/shopping6.webp',
        '/assets/immagini3/img01/shopping3.webp',
        '/assets/immagini3/img01/shopping4.webp',
        '/assets/immagini3/img01/shopping2.webp',
        '/assets/immagini3/img01/shopping5.webp'
      ],
      src: 'assets/immagini3/img01/shopping6.webp',
      price: 29.99,
      description:  "Le Nike Air Max 270 offrono un comfort incredibile grazie all'ammortizzazione Air Max. Ideali per l'uso quotidiano e l'attività sportiva.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Nike Air Max',
      category: "Sneakers" },
    { id: 12, 
      name: "Nike Air Zoom Vomero 16",
      image2: [
        '/assets/immagini3/img12/shopping6.webp',
        '/assets/immagini3/img12/shopping3.webp',
        '/assets/immagini3/img12/shopping4.webp',
        '/assets/immagini3/img12/shopping2.webp',
        '/assets/immagini3/img12/shopping5.webp'
      ],
      src: 'assets/immagini3/img12/shopping6.webp',
      price: 149.99,
      description: "Le Nike Air Zoom Vomero 16 sono scarpe da corsa ammortizzate e reattive, ideali per lunghe distanze e allenamenti intensi.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Placeholder 2',
      category: "Running" },
    { id: 5,  
      name: "Nike Air Jordan 1 Mid",
      image2: [
        'assets/immagini3/img05/shopping5.webp',
        'assets/immagini3/img05/shopping3.webp',
        'assets/immagini3/img05/shopping4.webp',
        'assets/immagini3/img05/shopping2.webp',
        'assets/immagini3/img05/shopping6.webp'
      ], 
      src:  'assets/immagini3/img05/shopping5.webp',
      price: 149.99,
      description: "Le Nike Air Jordan 1 Mid sono scarpe da basket iconiche, ispirate al modello originale del 1985. Confortevoli e dal look distintivo.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Placeholder 3',
      category: "Basket" },
    { id: 31,
       name: "Nike Air Max 95",
       image2: [
        'assets/immagini3/img31/shopping5.webp',
        'assets/immagini3/img31/shopping3.webp',
        'assets/immagini3/img31/shopping4.webp',
        'assets/immagini3/img31/shopping2.webp',
        'assets/immagini3/img31/shopping6.webp'
      ], 
       src: 'assets/immagini3/img31/shopping5.webp',
       price: 159.99,
       description: "Le Nike Air Max 95 sono scarpe iconiche con un design distintivo e un'ammortizzazione Air Max visibile.",
       sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
       alt: 'Placeholder 4',
       category: "Sneakers" },
    { id: 25, 
      name: "Nike Air Zoom Wildhorse 7",
      image2: [
        'assets/immagini3/img25/shopping5.webp',
        'assets/immagini3/img25/shopping3.webp',
        'assets/immagini3/img25/shopping4.webp',
        'assets/immagini3/img25/shopping2.webp',
        'assets/immagini3/img25/shopping6.webp'
      ], 
      src: 'assets/immagini3/img25/shopping5.webp',
      price: 139.99,
      description: "Le Nike Air Zoom Wildhorse 7 sono scarpe da golf progettate per la massima trazione e stabilità su terreni accidentati.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Placeholder 5',
      category: "Running" },
    { id: 43, 
      name: "Nike Air Force 1 High",
      image2:[
        'assets/immagini3/img43/shopping5.webp',
        'assets/immagini3/img43/shopping3.webp',
        'assets/immagini3/img43/shopping4.webp',
        'assets/immagini3/img43/shopping2.webp',
        'assets/immagini3/img43/shopping6.webp'
      ], 
      src: 'assets/immagini3/img43/shopping5.webp',
      price: 129.99,
      description: "Le Nike Air Force 1 High sono un'icona dello stile urbano, con un'ammortizzazione Air-Sole per il massimo comfort.",
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      alt: 'Placeholder 6',
      category: "Best Seller" }
  ];
   

  progress = 0;



  // Proprietà per la scrollbar automatica
  originalAutoScrollImages: string[] = [
    'assets/immagini3/img00/nike-air.jpg',
    'assets/immagini3/img00/nike-zoom-fly6-ficha-foto-recurso7-XxXx95.jpg',
    'assets/immagini3/img00/ccome-sapere-nike-sono-autentiche-10616-1200x572x80xX.jpg',
    'assets/immagini3/img00/nike-running-shoes-streakfly-invincible.webp',
  
  ];
  
  // Array duplicato per scorrimento infinito
  autoScrollImages: string[] = [];
  
  currentAutoScrollIndex = 0;
  autoScrollInterval: any;
  isTransitioning = false;

  ngAfterViewInit() {

  // Prova a far partire il video appena il DOM è pronto //
  //video//
    if (this.videoRef && this.videoRef.nativeElement) {
      const video = this.videoRef.nativeElement;
      video.muted = true;
      video.play().catch(err => {
        console.error('Errore nella riproduzione automatica:', err);
      });
    }

 //video//

     this.updateProgress();
     // Avvia la scrollbar automatica
     this.startAutoScroll();
     // Aggiungi listener per il resize della finestra
    window.addEventListener('resize', () => {
      this.updateProgress();
    });
   }

  initializeInfiniteScroll() {
    // Duplica le immagini per creare l'effetto infinito
    this.autoScrollImages = [...this.originalAutoScrollImages, ...this.originalAutoScrollImages];
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      if (!this.isTransitioning) {
        this.currentAutoScrollIndex++;
        
        // Quando raggiungiamo la fine del primo set di immagini duplicate
        if (this.currentAutoScrollIndex >= this.originalAutoScrollImages.length) {
          // Aspetta che la transizione finisca, poi resetta senza animazione
          setTimeout(() => {
            this.isTransitioning = true;
            this.currentAutoScrollIndex = 0;
            // Rimuovi temporaneamente la transizione per il reset
            setTimeout(() => {
              this.isTransitioning = false;
            }, 50);
          }, 500); // Aspetta che la transizione CSS finisca
        }
      }
    }, 3000);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  goToSlide(index: number) {
    this.currentAutoScrollIndex = index;
    // Riavvia il timer automatico
    this.stopAutoScroll();
    this.startAutoScroll();
  }

  getAutoScrollTitle(index: number): string {
    const realIndex = index % this.originalAutoScrollImages.length;
    const titles = [
      'NIKE AIR MAX',
      'NIKE ZOOM FLY',
      'NIKE AUTHENTIC',
      'NIKE REVOLUTION',
      'NIKE PEGASUS',
      'NIKE REACT'
    ];
    return titles[realIndex] || 'NIKE COLLECTION';
  }

  getAutoScrollSubtitle(index: number): string {
    const realIndex = index % this.originalAutoScrollImages.length;
    const subtitles = [
      'Comfort e stile per ogni passo',
      'Velocità e prestazioni',
      'Autenticità garantita',
      'Rivoluziona il tuo stile',
      'Leggendaria ammortizzazione',
      'Energia reattiva'
    ];
    return subtitles[realIndex] || 'Scopri la collezione';
  }

  ngOnDestroy() {
    this.stopAutoScroll();
    // Rimuovi listener per il resize
    window.removeEventListener('resize', () => {
      this.updateProgress();
    });
  }

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
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      const el = this.scrollContainer.nativeElement;
      const scrollLeft = el.scrollLeft;
      const maxScroll = el.scrollWidth - el.clientWidth;
      this.progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    }
  }

  onBuy(item: any) {
    console.log('[HomePage] onBuy chiamato con item:', item);
    
    // Cerca il prodotto completo usando l'id
    const prodottoCompleto = this.ProdottiService.getAllProducts().find(p => p.id === item.id);
    
    if (prodottoCompleto) {
      console.log('[HomePage] Prodotto completo trovato:', prodottoCompleto);
      
      // Naviga direttamente alla pagina di dettaglio del prodotto
      console.log('[HomePage] Navigando al dettaglio prodotto con ID:', prodottoCompleto.id);
      
      // Salva il prodotto selezionato nel servizio
      this.ProdottiService.setSelectedProduct(prodottoCompleto);
      
      // Naviga alla pagina di dettaglio usando l'ID del prodotto
      // Usa il percorso corretto come definito in app-routing.module.ts
      this.router.navigate(['/dettaglio-prodotti', prodottoCompleto.id]);
    } else {
      console.error('❌ Prodotto non trovato per ID:', item.id);
    }
  }


// FINE SCROLLBAR //

// INIZIO INPUT DI RICERCA //


 allSuggestions: string[] = [    // nomi chiave dei prodotti inseriti a sinistra della finestra di ricerca dell'input //
    'Nike Air',
    'Jordan',
    "Zoom",
    "Force",
    "React"
  
  ];

  isMatch(char: string): boolean {
    return this.searchTerm.toLowerCase().includes(char.toLowerCase());
  }

  resetSearch() {
    this.searchTerm = '';
    // Non chiamiamo filtraProdotti('') per mantenere i risultati precedenti
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
  
  // Inizializza array duplicato per scorrimento infinito
  this.initializeInfiniteScroll();
}

// Questo metodo si collega all'output del componente search
onSearchTermChange(term: string) {
  this.searchTerm = term;
  
  // Solo se il termine non è vuoto, applica il filtro
  if (term.trim()) {
    this.ProdottiService.filtraProdotti(term);
  }
  // Se è vuoto, mantieni i risultati precedenti
}

filtraPerCategoria(categoria: string) {
  console.log('[HomePage] Filtrando per categoria:', categoria);
  
  // Prima filtriamo i prodotti
  this.ProdottiService.filtroPerCategoria(categoria);
  
  // Verifichiamo quanti prodotti sono stati filtrati
  const prodottiFiltrati = this.ProdottiService.getFilteredProducts();
  console.log('[HomePage] Prodotti filtrati:', prodottiFiltrati.length);
  
  // Aggiorniamo anche i prodotti filtrati localmente
  this.prodottiFiltrati = prodottiFiltrati;
  
  // Navighiamo alla pagina prodotti
  this.router.navigate(['/prodotti']);
}

// Nuovo metodo per filtrare per categoria senza navigare
filtraPerCategoriaInPlace(categoria: string) {
  this.ProdottiService.filtroPerCategoria(categoria);
  // Aggiorniamo anche i prodotti filtrati localmente
  this.prodottiFiltrati = this.ProdottiService.getFilteredProducts();
}
  clearSearch(): void {
    this.searchTerm = '';
    // Non modifichiamo prodottiFiltrati per mantenere i risultati precedenti
  
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    });
  }

onSuggestionClick(suggestion: string) {
  this.searchTerm = suggestion;
 // this.filterProducts();

 // this.ProdottiService.setProducts(this.filteredProducts);//
  this.ProdottiService.setProducts(this.prodottiFiltrati, suggestion);
 this.showOverlay = false; // chiude overlay

  this.router.navigate(['/prodotti']);
}
   
// FINE INPUT DI RICERCA //
}


