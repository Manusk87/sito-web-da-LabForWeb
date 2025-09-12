import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  // Footer toggle functionality
  footerExpandedSections: { [key: string]: boolean } = {
    'risorse': false,
    'assistenza': false,
    'azienda': false,
    'italia': false
  };

  toggleFooterSection(section: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Salva la posizione di scroll corrente
    const currentScrollY = window.scrollY;
    
    this.footerExpandedSections[section] = !this.footerExpandedSections[section];
    
    // Ripristina la posizione di scroll dopo un breve delay per permettere il rendering
    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 0);
  }

}
