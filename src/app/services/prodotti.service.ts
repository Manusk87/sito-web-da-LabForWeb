import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { product } from '../type/prodotti.type';




@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

 
  private nome: string = '';
  private filtroCorrente = '';
 
private allProducts: product[] = [
 
    
    {
      id: 1,
      name: "Nike Air Max 270",
      category: "Sneakers",
      price: 29.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Grigio", "Blu", ],
      description: "Le Nike Air Max 270 offrono un comfort incredibile grazie all'ammortizzazione Air Max. Ideali per l'uso quotidiano e l'attività sportiva.",
      image: '/assets/immagini3/img01/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img01/shopping6.webp',
      '/assets/immagini3/img01/shopping3.webp',
      '/assets/immagini3/img01/shopping4.webp',
      '/assets/immagini3/img01/shopping2.webp',
      '/assets/immagini3/img01/shopping5.webp'
    ]
    },
    {
      id: 2,
      name: "Nike React Infinity Run Flyknit",
      category: "In evidenza",
      price: 159.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero/Giallo", "Grigio/Blu", "Bianco/Rosso", "Verde", "Blu"],
      description: "Le Nike React Infinity Run Flyknit sono progettate per la massima ammortizzazione e stabilità durante la corsa. Con tomaia in Flyknit per un comfort superiore.",
      image: '/assets/immagini3/img02/shopping4.webp', 
      image2:  [
      '/assets/immagini3/img02/shopping4.webp',
      '/assets/immagini3/img02/shopping3.webp',
      '/assets/immagini3/img02/shopping6.webp',
      '/assets/immagini3/img02/shopping5.webp',
      '/assets/immagini3/img02/shopping1.webp'
    ]
    },
    {
      id: 3,
      name: "Nike Air Force 1",
      category: "In evidenza",
      price: 109.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Bianco", "Nero", "Rosso", "Blu", "Grigio"],
      description: "Le Nike Air Force 1 sono un'icona streetwear, caratterizzate da un design classico e un comfort eccezionale.",
      image: '/assets/immagini3/img03/shopping3.webp', 
      image2:  [
      '/assets/immagini3/img03/shopping3.webp',
      '/assets/immagini3/img03/shopping1.webp',
      '/assets/immagini3/img03/shopping4.webp',
      '/assets/immagini3/img03/shopping2.webp',
      '/assets/immagini3/img03/shopping5.webp'
    ]
    },
    {
      id: 4,
      name: "Nike Air Zoom Pegasus 38",
      category: "Best Seller",
      price: 119.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Grigio/Arancione", "Bianco/Nero", "Blu/Verde", "Rosso", "Nero"],
      description: "Le Nike Air Zoom Pegasus 38 offrono una corsa reattiva e ammortizzata grazie all'unità Zoom Air. Ideali per runner di tutti i livelli.",
       image: '/assets/immagini3/img04/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img04/shopping6.webp',
      '/assets/immagini3/img04/shopping3.webp',
      '/assets/immagini3/img04/shopping4.webp',
      '/assets/immagini3/img04/shopping2.webp',
      '/assets/immagini3/img04/shopping5.webp'
    ]
    },
    {
      id: 5,
      name: "Nike Air Jordan 1 Mid",
      category: "In evidenza",
      price: 149.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero/Rosso", "Bianco/Nero", "Blu/Rosso", "Verde", "Rosso/Bianco"],
      description: "Le Nike Air Jordan 1 Mid sono scarpe da basket iconiche, ispirate al modello originale del 1985. Confortevoli e dal look distintivo.",
      image: '/assets/immagini3/img05/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img05/shopping5.webp',
      '/assets/immagini3/img05/shopping3.webp',
      '/assets/immagini3/img05/shopping4.webp',
      '/assets/immagini3/img05/shopping2.webp',
      '/assets/immagini3/img05/shopping6.webp'
    ]
    },
    {
      id: 6,
      name: "Nike Revolution 5",
      category: "Best Seller",
      price: 79.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Grigio", "Blu", "Rosso"],
      description: "Le Nike Revolution 5 sono scarpe leggere e traspiranti, ideali per correre o per l'uso quotidiano. Ottimo rapporto qualità-prezzo.",
    image: '/assets/immagini3/img06/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img06/shopping6.webp',
      '/assets/immagini3/img06/shopping3.webp',
      '/assets/immagini3/img06/shopping4.webp',
      '/assets/immagini3/img06/shopping2.webp',
      '/assets/immagini3/img06/shopping5.webp'
    ]
    },
    {
      id: 7,
      name: "Nike Air Zoom Structure 24",
      category: "Running",
      price: 129.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero/Grigio", "Bianco/Nero", "Blu", "Rosso", "Verde"],
      description: "Le Nike Air Zoom Structure 24 sono scarpe da corsa stabili e ammortizzate, ideali per runner che cercano supporto e comfort.",
      image: '/assets/immagini3/img07/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img07/shopping5.webp',
      '/assets/immagini3/img07/shopping3.webp',
      '/assets/immagini3/img07/shopping4.webp',
      '/assets/immagini3/img07/shopping2.webp',
      '/assets/immagini3/img07/shopping1.webp'
    ]
    },
    {
      id: 8,
      name: "Nike Air Max 97",
      category: "Sneakers",
      price: 179.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Argento", "Nero", "Oro", "Rosso", "Bianco"],
      description: "Le Nike Air Max 97 sono sneakers iconiche caratterizzate da un design futuristico e un'ammortizzazione leggendaria.",
      image: '/assets/immagini3/img08/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img08/shopping6.webp',
      '/assets/immagini3/img08/shopping3.webp',
      '/assets/immagini3/img08/shopping4.webp',
      '/assets/immagini3/img08/shopping2.webp',
      '/assets/immagini3/img08/shopping1.webp'
    ]
    },
    {
      id: 9,
      name: "Nike Air Zoom Terra Kiger 7",
      category: "Best Seller",
      price: 139.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero/Grigio", "Blu", "Verde", "Rosso", "Arancione"],
      description: "Le Nike Air Zoom Terra Kiger 7 sono progettate per il trail running, offrendo trazione e stabilità su terreni accidentati.",
      image: '/assets/immagini3/img09/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img09/shopping5.webp',
      '/assets/immagini3/img09/shopping3.webp',
      '/assets/immagini3/img09/shopping4.webp',
      '/assets/immagini3/img09/shopping2.webp',
      '/assets/immagini3/img09/shopping6.webp'
    ]
  
    },
    {
      id: 10,
      name: "Nike Air VaporMax Plus",
      category: "Sneakers",
      price: 209.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Verde"],
      description: "Le Nike Air VaporMax Plus offrono un'esperienza di corsa leggera e reattiva grazie all'unità VaporMax a tutta lunghezza.",
      image: '/assets/immagini3/img10/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img10/shopping6.webp',
      '/assets/immagini3/img10/shopping3.webp',
      '/assets/immagini3/img10/shopping4.webp',
      '/assets/immagini3/img10/shopping2.webp',
      '/assets/immagini3/img10/shopping5.webp'
    ]
    },
    {
      id: 11,
      name: "Nike Air Max 90",
      category: "Sneakers",
      price: 119.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max 90 sono sneakers classiche con dettagli iconici, offrendo comfort e stile per tutti i giorni.",
      image: '/assets/immagini3/img11/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img11/shopping5.webp',
      '/assets/immagini3/img11/shopping3.webp',
      '/assets/immagini3/img11/shopping4.webp',
      '/assets/immagini3/img11/shopping2.webp',
      '/assets/immagini3/img11/shopping6.webp'
    ]
    },
    {
      id: 12,
      name: "Nike Air Zoom Vomero 16",
      category: "Running",
      price: 149.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Verde"],
      description: "Le Nike Air Zoom Vomero 16 sono scarpe da corsa ammortizzate e reattive, ideali per lunghe distanze e allenamenti intensi.",
      image: '/assets/immagini3/img12/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img12/shopping6.webp',
      '/assets/immagini3/img12/shopping3.webp',
      '/assets/immagini3/img12/shopping4.webp',
      '/assets/immagini3/img12/shopping2.webp',
      '/assets/immagini3/img12/shopping5.webp'
    ]
    },
    {
      id: 13,
      name: "Nike Air Jordan 4 Retro",
      category: "Basket",
      price: 199.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero/Rosso", "Bianco/Nero", "Blu/Rosso", "Grigio", "Verde"],
      description: "Le Nike Air Jordan 4 Retro sono scarpe da basket iconiche con dettagli classici e comfort eccezionale.",
       image: '/assets/immagini3/img13/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img13/shopping6.webp',
      '/assets/immagini3/img13/shopping3.webp',
      '/assets/immagini3/img13/shopping4.webp',
      '/assets/immagini3/img13/shopping2.webp',
      '/assets/immagini3/img13/shopping5.webp'
    ]
    },
    {
      id: 14,
      name: "Nike Blazer Mid '77 Vintage",
      category: "Sneakers",
      price: 99.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Bianco", "Nero", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Blazer Mid '77 Vintage sono sneakers retrò con uno stile distintivo e una tomaia in pelle premium.",
       image: '/assets/immagini3/img14/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img14/shopping5.webp',
      '/assets/immagini3/img14/shopping3.webp',
      '/assets/immagini3/img14/shopping4.webp',
      '/assets/immagini3/img14/shopping2.webp',
      '/assets/immagini3/img14/shopping6.webp'
    ]
    },
    {
      id: 15,
      name: "Nike Air Max Excee",
      category: "Sneakers",
      price: 89.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Bianco", "Nero", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max Excee sono ispirate alle iconiche Air Max 90, offrendo comfort e stile in un design moderno.",
      image: '/assets/immagini3/img15/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img15/shopping6.webp',
      '/assets/immagini3/img15/shopping3.webp',
      '/assets/immagini3/img15/shopping4.webp',
      '/assets/immagini3/img15/shopping2.webp',
      '/assets/immagini3/img15/shopping5.webp'
    ]
    },
    {
      id: 16,
      name: "Nike Air Zoom SuperRep 2",
      category: "Training",
      price: 129.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Verde"],
      description: "Le Nike Air Zoom SuperRep 2 sono scarpe da training con ammortizzazione reattiva e supporto per gli allenamenti più intensi.",
      image: '/assets/immagini3/img16/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img16/shopping5.webp',
      '/assets/immagini3/img16/shopping3.webp',
      '/assets/immagini3/img16/shopping4.webp',
      '/assets/immagini3/img16/shopping2.webp',
      '/assets/immagini3/img16/shopping6.webp'
    ]
    },
    {
      id: 17,
      name: "Nike Air Zoom Freak 3",
      category: "Basket",
      price: 129.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero/Bianco", "Rosso/Nero", "Blu", "Grigio", "Verde"],
      description: "Le Nike Air Zoom Freak 3 sono scarpe da basket progettate per la potenza e la velocità di Giannis Antetokounmpo. Massima trazione e stabilità.",
      image: '/assets/immagini3/img17/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img17/shopping6.webp',
      '/assets/immagini3/img17/shopping3.webp',
      '/assets/immagini3/img17/shopping4.webp',
      '/assets/immagini3/img17/shopping2.webp',
      '/assets/immagini3/img17/shopping5.webp'
    ]
    },
    {
      id: 18,
      name: "Nike Renew Run",
      category: "Golf",
      price: 99.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Verde"],
      description: "Le Nike Renew Run sono scarpe ammortizzate e leggere, ideali per i giocatori di golf di tutti i livelli.",
      image: '/assets/immagini3/img18/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img18/shopping5.webp',
      '/assets/immagini3/img18/shopping3.webp',
      '/assets/immagini3/img18/shopping4.webp',
      '/assets/immagini3/img18/shopping2.webp',
      '/assets/immagini3/img18/shopping6.webp'
    ]
    },
    {
      id: 19,
      name: "Nike Air Max Sequent 4",
      category: "Sneakers",
      price: 119.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max Sequent 4 sono scarpe da corsa comode e versatili, ideali per l'uso quotidiano o l'allenamento leggero.",
      image: '/assets/immagini3/img19/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img19/shopping6.webp',
      '/assets/immagini3/img19/shopping3.webp',
      '/assets/immagini3/img19/shopping4.webp',
      '/assets/immagini3/img19/shopping2.webp',
      '/assets/immagini3/img19/shopping5.webp'
    ]
    },
    {
      id: 20,
      name: "Nike Air Max 2090",
      category: "Tennis",
      price: 149.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max 2090 sono ispirate all'iconica Air Max 90, con un design futuristico e un'ammortizzazione avanzata.",
      image: '/assets/immagini3/img20/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img20/shopping5.webp',
      '/assets/immagini3/img20/shopping3.webp',
      '/assets/immagini3/img20/shopping4.webp',
      '/assets/immagini3/img20/shopping2.webp',
      '/assets/immagini3/img20/shopping6.webp'
    ]
    },
    
    {
      id: 21,
      name: "Nike Joyride Run Flyknit",
      category: "Running",
      price: 159.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Joyride Run Flyknit offrono un'esperienza di corsa rivoluzionaria grazie alla tecnologia di ammortizzazione a microsfere.",
      image: '/assets/immagini3/img21/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img21/shopping6.webp',
      '/assets/immagini3/img21/shopping3.webp',
      '/assets/immagini3/img21/shopping4.webp',
      '/assets/immagini3/img21/shopping2.webp',
      '/assets/immagini3/img21/shopping5.webp'
    ]
    },
    {
      id: 22,
      name: "Nike Air Max Tailwind IV",
      category: "Sneakers",
      price: 129.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max Tailwind IV sono scarpe da running retrò con un'ammortizzazione Air Max e uno stile distintivo.",
      image: '/assets/immagini3/img22/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img22/shopping5.webp',
      '/assets/immagini3/img22/shopping3.webp',
      '/assets/immagini3/img22/shopping4.webp',
      '/assets/immagini3/img22/shopping2.webp',
      '/assets/immagini3/img22/shopping6.webp'
    ]
    },
    {
      id: 23,
      name: "Nike Air Zoom Structure 23",
      category: "Tennis",
      price: 129.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Zoom Structure 23 offrono supporto e stabilità per i tennisti, con un'ammortizzazione reattiva e una tomaia traspirante.",
      image: '/assets/immagini3/img23/shopping2.webp', 
      image2:  [
      '/assets/immagini3/img23/shopping2.webp',
      '/assets/immagini3/img23/shopping3.webp',
      '/assets/immagini3/img23/shopping4.webp',
      '/assets/immagini3/img23/shopping6.webp',
      '/assets/immagini3/img23/shopping5.webp'
    ]
    },
    {
      id: 24,
      name: "Nike Air Max 270 React",
      category: "Tennis",
      price: 159.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max 270 React uniscono il comfort dell'unità Air Max con la reattività della tecnologia React.",
      image: '/assets/immagini3/img24/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img24/shopping6.webp',
      '/assets/immagini3/img24/shopping3.webp',
      '/assets/immagini3/img24/shopping4.webp',
      '/assets/immagini3/img24/shopping2.webp',
      '/assets/immagini3/img24/shopping5.webp'
    ]
    },
    {
      id: 25,
      name: "Nike Air Zoom Wildhorse 7",
      category: "Golf",
      price: 139.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Zoom Wildhorse 7 sono scarpe da golf progettate per la massima trazione e stabilità su terreni accidentati.",
      image: '/assets/immagini3/img25/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img25/shopping5.webp',
      '/assets/immagini3/img25/shopping3.webp',
      '/assets/immagini3/img25/shopping4.webp',
      '/assets/immagini3/img25/shopping2.webp',
      '/assets/immagini3/img25/shopping6.webp'
    ]
    },
    {
      id: 26,
      name: "Nike React Infinity Run Flyknit 2",
      category: "Running",
      price: 169.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike React Infinity Run Flyknit 2 sono scarpe da corsa con una tomaia in Flyknit e un'ammortizzazione reattiva per una corsa fluida.",
      image: '/assets/immagini3/img26/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img26/shopping6.webp',
      '/assets/immagini3/img26/shopping3.webp',
      '/assets/immagini3/img26/shopping4.webp',
      '/assets/immagini3/img26/shopping2.webp',
      '/assets/immagini3/img26/shopping5.webp'
    ]
    },
    {
      id: 27,
      name: "Nike Air Zoom SuperRep",
      category: "Training",
      price: 129.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Zoom SuperRep sono scarpe da training con un'ammortizzazione reattiva e una suola stabile per gli esercizi in palestra.",
      image: '/assets/immagini3/img27/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img27/shopping5.webp',
      '/assets/immagini3/img27/shopping3.webp',
      '/assets/immagini3/img27/shopping4.webp',
      '/assets/immagini3/img27/shopping2.webp',
      '/assets/immagini3/img27/shopping6.webp'
    ]
    },
    {
      id: 28,
      name: "Nike Air Zoom Freak 2",
      category: "Basket",
      price: 119.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Zoom Freak 2 sono scarpe da basket con un'ammortizzazione reattiva e un design ispirato a Giannis Antetokounmpo.",
      image: '/assets/immagini3/img28/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img28/shopping6.webp',
      '/assets/immagini3/img28/shopping3.webp',
      '/assets/immagini3/img28/shopping4.webp',
      '/assets/immagini3/img28/shopping2.webp',
      '/assets/immagini3/img28/shopping5.webp'
    ]
    },
    {
      id: 29,
      name: "Nike Metcon 7",
      category: "Training",
      price: 139.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Metcon 7 sono scarpe da training progettate per la stabilità e la resistenza, ideali per gli allenamenti più intensi.",
      image: '/assets/immagini3/img29/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img29/shopping5.webp',
      '/assets/immagini3/img29/shopping3.webp',
      '/assets/immagini3/img29/shopping4.webp',
      '/assets/immagini3/img29/shopping2.webp',
      '/assets/immagini3/img29/shopping6.webp'
    ]
    },
    {
      id: 30,
      name: "Nike React Element 55",
      category: "Tennis",
      price: 119.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike React Element 55 sono scarpe da tennis confortevoli e leggere, ideali per gli allenamenti.",
      image: '/assets/immagini3/img30/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img30/shopping6.webp',
      '/assets/immagini3/img30/shopping3.webp',
      '/assets/immagini3/img30/shopping4.webp',
      '/assets/immagini3/img30/shopping2.webp',
      '/assets/immagini3/img30/shopping5.webp'
    ]
    },
    {
      id: 31,
      name: "Nike Air Max 95",
      category: "Sneakers",
      price: 159.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max 95 sono scarpe iconiche con un design distintivo e un'ammortizzazione Air Max visibile.",
      image: '/assets/immagini3/img31/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img31/shopping5.webp',
      '/assets/immagini3/img31/shopping3.webp',
      '/assets/immagini3/img31/shopping4.webp',
      '/assets/immagini3/img31/shopping2.webp',
      '/assets/immagini3/img31/shopping6.webp'
    ]
    },
    {
      id: 32,
      name: "Nike Air Zoom Winflo 8",
      category: "Running",
      price: 109.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Zoom Winflo 8 sono scarpe da corsa leggere e reattive, ideali per allenamenti e gare su strada.",
      image: '/assets/immagini3/img32/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img32/shopping6.webp',
      '/assets/immagini3/img32/shopping3.webp',
      '/assets/immagini3/img32/shopping4.webp',
      '/assets/immagini3/img32/shopping2.webp',
      '/assets/immagini3/img32/shopping5.webp'
    ]
    },
    {
      id: 33,
      name: "Nike Air Force 1 React",
      category: "Sneakers",
      price: 119.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Force 1 React uniscono il classico stile delle Air Force 1 con la reattività della tecnologia React.",
      image: '/assets/immagini3/img33/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img33/shopping5.webp',
      '/assets/immagini3/img33/shopping3.webp',
      '/assets/immagini3/img33/shopping4.webp',
      '/assets/immagini3/img33/shopping2.webp',
      '/assets/immagini3/img33/shopping6.webp'
    ]
    },
    {
      id: 34,
      name: "Nike Air Max Bella TR 4",
      category: "Training",
      price: 89.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max Bella TR 4 sono scarpe da training leggere e flessibili, ideali per gli allenamenti in palestra o all'aperto.",
      image: '/assets/immagini3/img34/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img34/shopping6.webp',
      '/assets/immagini3/img34/shopping3.webp',
      '/assets/immagini3/img34/shopping4.webp',
      '/assets/immagini3/img34/shopping2.webp',
      '/assets/immagini3/img34/shopping5.webp'
    ]
    },
    
    
    {
      id: 35,
      name: "Nike Air Max Plus",
      category: "Sneakers",
      price: 169.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max Plus sono sneakers iconiche con un design audace e un'ammortizzazione Max Air per il massimo comfort.",
      image: '/assets/immagini3/img35/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img35/shopping5.webp',
      '/assets/immagini3/img35/shopping3.webp',
      '/assets/immagini3/img35/shopping4.webp',
      '/assets/immagini3/img35/shopping2.webp',
      '/assets/immagini3/img35/shopping6.webp'
    ]
    },
  
    {
      id: 36,
      name: "Nike Air Zoom Tempo Next%",
      category: "Running",
      price: 199.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Zoom Tempo Next% sono scarpe da corsa ad alte prestazioni con tecnologia ZoomX per la massima reattività.",
      image: '/assets/immagini3/img36/shopping4.webp', 
      image2:  [
      '/assets/immagini3/img36/shopping4.webp',
      '/assets/immagini3/img36/shopping3.webp',
      '/assets/immagini3/img36/shopping6.webp',
      '/assets/immagini3/img36/shopping2.webp',
      '/assets/immagini3/img36/shopping5.webp'
    ]
  },
  {
      id: 37,
      name: "Nike Air Force 1 Low",
      category: "Tennis",
      price: 109.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Force 1 Low sono un classico intramontabile, ideali per un look casual e confortevole.",
      image: '/assets/immagini3/img37/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img37/shopping5.webp',
      '/assets/immagini3/img37/shopping3.webp',
      '/assets/immagini3/img37/shopping4.webp',
      '/assets/immagini3/img37/shopping2.webp',
      '/assets/immagini3/img37/shopping6.webp'
    ]
  },
  {
      id: 38,
      name: "Nike Air Zoom Alphafly NEXT%",
      category: "Running",
      price: 249.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Zoom Alphafly NEXT% sono le scarpe da maratona più avanzate mai realizzate, progettate per la massima prestazione.",
     image: '/assets/immagini3/img38/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img38/shopping6.webp',
      '/assets/immagini3/img38/shopping3.webp',
      '/assets/immagini3/img38/shopping4.webp',
      '/assets/immagini3/img38/shopping2.webp',
      '/assets/immagini3/img38/shopping5.webp'
    ]
  },
  {
      id: 39,
      name: "Nike Air Max 1",
      category: "Golf",
      price: 129.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max 1 sono le iconiche scarpe da corsa che hanno rivoluzionato il mondo del golf, con un design unico e confortevole.",
      image: '/assets/immagini3/img39/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img39/shopping5.webp',
      '/assets/immagini3/img39/shopping3.webp',
      '/assets/immagini3/img39/shopping4.webp',
      '/assets/immagini3/img39/shopping2.webp',
      '/assets/immagini3/img39/shopping6.webp'
    ]
  },
  {
      id: 40,
      name: "Nike Air Max Plus 2",
      category: "Tennis",
      price: 179.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max Plus 2 sono il rinnovamento delle iconiche Air Max Plus, con un'ammortizzazione Max Air e uno stile unico.",
      image: '/assets/immagini3/img40/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img40/shopping6.webp',
      '/assets/immagini3/img40/shopping3.webp',
      '/assets/immagini3/img40/shopping4.webp',
      '/assets/immagini3/img40/shopping2.webp',
      '/assets/immagini3/img40/shopping5.webp'
    ]
  },
  {
      id: 41,
      name: "Nike Air Max 720",
      category: "Tennis",
      price: 169.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max 720 offrono un'ammortizzazione Air Max a tutta lunghezza, per un comfort e uno stile senza precedenti.",
       image: '/assets/immagini3/img41/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img41/shopping5.webp',
      '/assets/immagini3/img41/shopping3.webp',
      '/assets/immagini3/img41/shopping4.webp',
      '/assets/immagini3/img41/shopping2.webp',
      '/assets/immagini3/img41/shopping6.webp'
    ]
  },
  {
      id: 42,
      name: "Nike Air Zoom Victory",
      category: "Running",
      price: 179.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Zoom Victory sono scarpe da corsa progettate per la velocità e il comfort, ideali per le gare su strada.",
      image: '/assets/immagini3/img42/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img42/shopping6.webp',
      '/assets/immagini3/img42/shopping3.webp',
      '/assets/immagini3/img42/shopping4.webp',
      '/assets/immagini3/img42/shopping2.webp',
      '/assets/immagini3/img42/shopping5.webp'
    ]
  },
  {
      id: 43,
      name: "Nike Air Force 1 High",
      category: "Sneakers",
      price: 129.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso","Grigio"],
      description: "Le Nike Air Force 1 High sono un'icona dello stile urbano, con un'ammortizzazione Air-Sole per il massimo comfort.",
      image: '/assets/immagini3/img43/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img43/shopping5.webp',
      '/assets/immagini3/img43/shopping3.webp',
      '/assets/immagini3/img43/shopping4.webp',
      '/assets/immagini3/img43/shopping2.webp',
      '/assets/immagini3/img43/shopping6.webp'
    ]
  },
  {
      id: 44,
      name: "Nike Free RN 5.0",
      category: "In evidenza",
      price: 99.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Free RN 5.0 sono scarpe da corsa leggere e flessibili, ideali per allenamenti e percorsi naturali.",
      image: '/assets/immagini3/img44/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img44/shopping6.webp',
      '/assets/immagini3/img44/shopping3.webp',
      '/assets/immagini3/img44/shopping4.webp',
      '/assets/immagini3/img44/shopping2.webp',
      '/assets/immagini3/img44/shopping5.webp'
    ]
  },
  {
      id: 45,
      name: "Nike Air Max Sequent 3",
      category: "Nuovi arrivi",
      price: 129.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max Sequent 3 sono scarpe da corsa comode e versatili, con un'ammortizzazione reattiva per prestazioni ottimali.",
      image: '/assets/immagini3/img45/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img45/shopping5.webp',
      '/assets/immagini3/img45/shopping3.webp',
      '/assets/immagini3/img45/shopping4.webp',
      '/assets/immagini3/img45/shopping2.webp',
      '/assets/immagini3/img45/shopping6.webp'
    ]
  },
  {
      id: 46,
      name: "Nike Air Zoom Freak 1",
      category: "Basket",
      price: 119.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Zoom Freak 1 sono scarpe da basket con un'ammortizzazione reattiva e un supporto ottimale, per massima performance in campo.",
      image: '/assets/immagini3/img46/shopping7.webp', 
      image2:  [
      '/assets/immagini3/img46/shopping7.webp',
      '/assets/immagini3/img46/shopping3.webp',
      '/assets/immagini3/img46/shopping4.webp',
      '/assets/immagini3/img46/shopping2.webp',
      '/assets/immagini3/img46/shopping5.webp'
    ]
  },
  {
      id: 47,
      name: "Nike Air Max 98",
      category: "In evidenza",
      price: 179.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max 98 sono scarpe da corsa con un design audace e un'ammortizzazione Air Max a tutta lunghezza.",
      image: '/assets/immagini3/img47/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img47/shopping5.webp',
      '/assets/immagini3/img47/shopping3.webp',
      '/assets/immagini3/img47/shopping4.webp',
      '/assets/immagini3/img47/shopping2.webp',
      '/assets/immagini3/img47/shopping5.webp'
    ]
  },
  {
      id: 48,
      name: "Nike Zoom Freak 2",
      category: "Nuovi arrivi",
      price: 129.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Zoom Freak 2 sono scarpe da basket con un'ammortizzazione reattiva e un design ispirato alla potenza di Giannis Antetokounmpo.",
      image: '/assets/immagini3/img48/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img48/shopping6.webp',
      '/assets/immagini3/img48/shopping3.webp',
      '/assets/immagini3/img48/shopping4.webp',
      '/assets/immagini3/img48/shopping2.webp',
      '/assets/immagini3/img48/shopping5.webp'
    ]
  },
  {
      id: 49,
      name: "Nike Air Max Axis",
      category: "Nuovi arrivi",
      price: 99.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Air Max Axis sono scarpe da corsa ispirate al design degli anni '90, con un'ammortizzazione Air Max e uno stile retrò.",
      image: '/assets/immagini3/img49/shopping5.webp', 
      image2:  [
      '/assets/immagini3/img49/shopping5.webp',
      '/assets/immagini3/img49/shopping3.webp',
      '/assets/immagini3/img49/shopping4.webp',
      '/assets/immagini3/img49/shopping2.webp',
      '/assets/immagini3/img49/shopping1.webp'
    ]
  },
  {
      id: 50,
      name: "Nike Zoom Pegasus Turbo 2",
      category: "Nuovi arrivi",
      price: 179.99,
      sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
      colors: ["Nero", "Bianco", "Blu", "Rosso", "Grigio"],
      description: "Le Nike Zoom Pegasus Turbo 2 sono scarpe da corsa leggere e veloci, con una schiuma ZoomX per un'ammortizzazione reattiva.",
      image: '/assets/immagini3/img50/shopping6.webp', 
      image2:  [
      '/assets/immagini3/img50/shopping6.webp',
      '/assets/immagini3/img50/shopping3.webp',
      '/assets/immagini3/img50/shopping4.webp',
      '/assets/immagini3/img50/shopping2.webp',
      '/assets/immagini3/img50/shopping5.webp'
    ]
  }
   
  
  
  ]

//  private ultimaRicercaValida: product[] = this.allProducts;

  private selectedProduct: product | null = null;

  private STORAGE_TERM = 'ultimoFiltroTerm';

  private STORAGE_TYPE = 'ultimoFiltroTipo';

//  private filtroTipo: 'categoria' | 'testo' = 'testo';  // default




getProductById(id: number): product | undefined {
  const all = this.getAllProducts(); // garantisce accesso anche dopo refresh
  return all.find(p => p.id === id);
}

  setSelectedProduct(product: product): void {
    this.selectedProduct = product;
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  }

  getSelectedProduct(): product | null {
    if (this.selectedProduct) {
      return this.selectedProduct;
    }
  
    const stored = localStorage.getItem('selectedProduct');
    return stored ? JSON.parse(stored) : null;
  }

  // Inizializza o aggiorna l'elenco completo //
  setAllProducts(products: product[]) {   

    this.allProducts = products;

      console.log('[setAllProducts] Prodotti impostati:', products.length);

    localStorage.setItem('allProducts', JSON.stringify(products));
  }
  
  // Restituisce tutti i prodotti originali //
getAllProducts(): product[] {
  if (!this.allProducts || this.allProducts.length === 0) {
    const stored = localStorage.getItem('allProducts');  
    this.allProducts = stored ? JSON.parse(stored) : [];
  }
  return this.allProducts;
}

    setProducts(products: any[], nome: string) { // prodotti filtrati //

    this.nome = nome;

    this.setFilteredProducts(products);

    localStorage.setItem('prodottiFiltrati', JSON.stringify(products));
    localStorage.setItem('filteredNome', nome);
  }

  getProducts(): any[] {        // prodotti filtrati //
    // Se la memoria è vuota, leggo da localStorage
    if (this.allProducts.length === 0) {
      const stored = localStorage.getItem('prodottiFiltrati');
      this.allProducts = stored ? JSON.parse(stored) : [];
    }
    return this.allProducts;
  }

  getNome(): string {
    // Se la memoria è vuota, leggo da localStorage
    if (!this.nome) {
      const stored = localStorage.getItem('filteredNome');
      this.nome = stored ? stored : '';
    }
    return this.nome;
  }

  // reset dei filtri //
clear(): void {
  this.prodottiFiltratiSubject.next([]);
  localStorage.removeItem('prodottiFiltrati');
  localStorage.removeItem('filteredNome');
  localStorage.removeItem(this.STORAGE_TERM);
  localStorage.removeItem(this.STORAGE_TYPE);
  localStorage.removeItem('filtroCorrente');
  localStorage.removeItem('filtroTipo');
}

  setSearchTerm(term: string): void {

    this.searchTermSubject.next(term);

    this.filtroCorrenteSubject.next(term);

    localStorage.setItem(this.STORAGE_TERM, term);
    this.filtraProdotti(term);
  }

  // prodotti filtrati con Observable //
  private prodottiFiltratiSubject = new BehaviorSubject<product[]>(
    JSON.parse(localStorage.getItem('prodottiFiltrati') || '[]')
  );
  prodottiFiltrati$ = this.prodottiFiltratiSubject.asObservable();

  // ricerca prodotti con Observable //
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  // BehaviorSubject per il termine di ricerca attuale
  private filtroCorrenteSubject = new BehaviorSubject<string>('');
  filtroCorrente$ = this.filtroCorrenteSubject.asObservable();

  private filtroTipoSubject = new BehaviorSubject<string>('');
  filtroTipo$ = this.filtroTipoSubject.asObservable();

// Aggiorna i prodotti filtrati (sia in memoria che in localStorage)
setFilteredProducts(products: product[]) {
  this.prodottiFiltratiSubject.next(products);
  localStorage.setItem('prodottiFiltrati', JSON.stringify(products));
}

// Recupera i prodotti filtrati da localStorage o dal BehaviorSubject
getFilteredProducts(): product[] {
  // Prima controlla il valore corrente del BehaviorSubject
  const currentFiltered = this.prodottiFiltratiSubject.value;
  if (currentFiltered && currentFiltered.length > 0) {
    return currentFiltered;
  }
  
  // Se non ci sono prodotti nel BehaviorSubject, prova a recuperarli da localStorage
  const stored = localStorage.getItem('prodottiFiltrati');
  return stored ? JSON.parse(stored) : [];
}

 // ✅ Richiamato ogni volta che cerchi qualcosa
 filtraProdotti(term: string): void {
  this.setFiltroTipo('testo');           // imposta tipo filtro
  this.setFiltroCorrente(term);           // salva termine

  const filtro = term.trim().toLowerCase();
  const prodotti = this.getAllProducts();


  console.log('[filtraProdotti]', {
    filtro,
    tipo: this.getFiltroTipo(),
    prodottiDisponibili: prodotti.length
  });


  // Se il filtro è vuoto o non specificato, mostra tutti i prodotti
  // altrimenti filtra i prodotti in base al termine di ricerca
  const prodottiFiltrati = filtro
    ? prodotti.filter(p =>
        p.name.toLowerCase().includes(filtro) ||
        p.category.toLowerCase().includes(filtro)
      )
    : prodotti;

  // Imposta sempre i prodotti filtrati, anche se l'array è vuoto
  // Questo permette al filtro di funzionare correttamente
  this.setFilteredProducts(prodottiFiltrati);
  
  console.log('[filtraProdotti] Risultati:', {
    prodottiFiltrati: prodottiFiltrati.length,
    filtroApplicato: filtro
  });
}
  
  filtroPerCategoria(categoria: string): void {
  this.setFiltroTipo('categoria');         // imposta tipo filtro
  this.setFiltroCorrente(categoria);       // salva termine

  const cat = categoria.trim().toLowerCase();
  const prodotti = this.getAllProducts();

  // Mappa delle categorie speciali che potrebbero non corrispondere esattamente
  const categorieSpeciali: Record<string, string[]> = {
    'nuovi arrivi': ['nuovi arrivi', 'novità', 'new', 'nuovo'],
    'best seller': ['best seller', 'bestseller', 'più venduti', 'popolari'],
    'running': ['running', 'corsa', 'run'],
    'basket': ['basket', 'basketball', 'pallacanestro'],
    'sneakers': ['sneakers', 'scarpe casual', 'lifestyle']
  };

  console.log('[filtroPerCategoria]', {
    categoria: cat,
    prodottiDisponibili: prodotti.length,
    categorieDisponibili: [...new Set(prodotti.map(p => p.category.toLowerCase()))]
  });

  // Filtra i prodotti per categoria
  let prodottiFiltrati = [];
  
  // 1. Prima prova la corrispondenza esatta
  prodottiFiltrati = prodotti.filter(p => p.category.toLowerCase() === cat);
  
  // 2. Se non ci sono risultati, prova con le categorie speciali
  if (prodottiFiltrati.length === 0) {
    // Trova se la categoria richiesta è una categoria speciale o una sua variante
    let categoriaTarget = cat;
    
    for (const [categoriaBase, varianti] of Object.entries(categorieSpeciali)) {
      if (varianti.includes(cat)) {
        categoriaTarget = categoriaBase;
        break;
      }
    }
    
    // Cerca prodotti che corrispondono alla categoria target o alle sue varianti
    const variantiTarget = categorieSpeciali[categoriaTarget] || [categoriaTarget];
    
    prodottiFiltrati = prodotti.filter(p => {
      const categoriaLower = p.category.toLowerCase();
      return variantiTarget.some(variante => categoriaLower.includes(variante));
    });
    
    // Gestione speciale per 'Nuovi Arrivi'
    if (cat === 'nuovi arrivi' && prodottiFiltrati.length === 0) {
      // Prendi i primi 10 prodotti come 'Nuovi Arrivi'
      prodottiFiltrati = prodotti.slice(0, 10);
    }
  }
  
  // 3. Se ancora non ci sono risultati, prova con la corrispondenza parziale
  if (prodottiFiltrati.length === 0 && cat) {
    prodottiFiltrati = prodotti.filter(p => p.category.toLowerCase().includes(cat));
  }
  
  // 4. Se ancora non ci sono risultati, mostra un messaggio di debug
  if (prodottiFiltrati.length === 0) {
    console.log('[filtroPerCategoria] ATTENZIONE: Nessun prodotto trovato per la categoria:', categoria);
    // Non mostriamo più tutti i prodotti se non ci sono risultati
    // Questo permette al filtro per categoria di funzionare correttamente
  }

  console.log('[filtroPerCategoria] Risultati:', {
    prodottiFiltrati: prodottiFiltrati.length,
    categoriaTrovata: prodottiFiltrati.length > 0 ? prodottiFiltrati[0].category : 'nessuna'
  });

  this.setFilteredProducts(prodottiFiltrati);
}

 // ✅ Recupera il valore attuale (anche dopo refresh)
 getCurrentFilterTerm(): string {
  return this.filtroCorrenteSubject.value || localStorage.getItem('filtroCorrente') || '';
}

setFiltroTipo(tipo: string) {
  this.filtroTipoSubject.next(tipo);
  localStorage.setItem('filtroTipo', tipo);
}


setFiltroCorrente(term: string) {
  this.filtroCorrenteSubject.next(term);
  localStorage.setItem('filtroCorrente', term);
}

getFiltroCorrente(): string {
  return this.filtroCorrenteSubject.value || localStorage.getItem('filtroCorrente') || '';
}

getFiltroTipo(): string {
  return this.filtroTipoSubject.value || localStorage.getItem('filtroTipo') || '';
}
}









