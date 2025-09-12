import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title = 'lab-air';
  private routerSubscription: Subscription;

  constructor(private router: Router) {
    // Sottoscrizione agli eventi di navigazione per scroll-to-top automatico
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Scroll immediato verso l'alto ad ogni cambio di route
        this.scrollToTop();
        
        // Scroll aggiuntivo con un piccolo delay per gestire il rendering asincrono
        setTimeout(() => {
          this.scrollToTop();
        }, 0);
      });
  }

  private scrollToTop(): void {
    try {
      // Metodo principale: posizionamento istantaneo al top (comportamento di caricamento)
      window.scrollTo(0, 0);
      
      // Fallback per diversi browser - sempre istantaneo
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      
      // Reset immediato di tutti gli elementi scrollabili
      const scrollableElements = document.querySelectorAll('[data-scroll], .scroll-container, .scrollable');
      scrollableElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.scrollTop = 0;
        }
      });
      
      // Forza il posizionamento immediato senza animazioni
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
    } catch (error) {
      // Fallback di sicurezza finale - sempre istantaneo
      console.warn('Scroll-to-top fallback attivato:', error);
      try {
        window.scrollTo(0, 0);
      } catch (finalError) {
        // Ultimo tentativo con metodo alternativo
        document.documentElement.scrollTop = 0;
      }
    }
  }

  ngOnDestroy(): void {
    // Cleanup della sottoscrizione per evitare memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  

  reloadAndGoHome() {
    // Esegui la navigazione alla homepage senza ricaricare fisicamente la pagina
    this.router.navigate(['/']);  // Naviga alla homepage
  }
}



