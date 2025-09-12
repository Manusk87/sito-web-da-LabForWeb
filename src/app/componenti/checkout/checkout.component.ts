import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrelloService } from '../../services/carrello.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cart: any[] = [];
  currentStep: number = 1; // Fase corrente (1 = consegna, 2 = pagamento, 3 = verifica)
  paymentForm: FormGroup;

  // Dati del form per tutte le fasi
  formData = {
    // Dati di consegna
    firstName: '',
    lastName: '',
    address: '',
    nome: '',
    cognome: '',
    zip: '',
    email: '',
    cap: '',
    telefono: '',
    phone: '',
    citta: '',
    indirizzo: '',
    spedizione: 'standard', // 'standard' o 'express'
    
    // Dati di pagamento
    metodoPagamento: '', // 'carta' o 'paypal'
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor(
    public carrelloService: CarrelloService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.cart = this.carrelloService.getCart();
    
    // Inizializza il form per i dati della carta di credito
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, this.cardNumberValidator]],
      expiryDate: ['', [Validators.required, this.expiryDateValidator]],
      cvv: ['', [Validators.required, this.cvvValidator]]
    });
  }

  ngOnInit(): void {
    // Verifica che ci siano prodotti nel carrello
    if (this.cart.length === 0) {
      this.router.navigate(['/carrello']);
    }
  }

  // NAVIGAZIONE TRA LE FASI
  goToStep1(): void {
    this.currentStep = 1;
  }

  goToStep2(deliveryForm?: any): void {
    if (deliveryForm && deliveryForm.valid) {
      this.currentStep = 2;
    } else if (!deliveryForm) {
      this.currentStep = 2;
    }
  }

  goToStep3(): void {
    if (this.isPaymentValid()) {
      this.currentStep = 3;
    }
  }

  // VALIDAZIONE PAGAMENTO
  isPaymentValid(): boolean {
    if (this.formData.metodoPagamento === 'carta') {
      return this.paymentForm.valid;
    } else if (this.formData.metodoPagamento === 'paypal') {
      return true; // PayPal non richiede validazione aggiuntiva
    }
    return false; // Nessun metodo di pagamento selezionato
  }

  // VALIDATORE PERSONALIZZATO PER NUMERO CARTA (ALGORITMO DI LUHN)
  cardNumberValidator(control: any) {
    if (!control.value) {
      return null;
    }
    
    const cardNumber = control.value.replace(/\s/g, '');
    
    // Verifica lunghezza (13-19 cifre)
    if (!/^\d{13,19}$/.test(cardNumber)) {
      return { 'invalidCardNumber': true };
    }
    
    // Algoritmo di Luhn
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    if (sum % 10 !== 0) {
      return { 'invalidCardNumber': true };
    }
    
    return null;
  }

  // VALIDATORE PERSONALIZZATO PER DATA DI SCADENZA (MM/YY)
  expiryDateValidator(control: any) {
    if (!control.value) {
      return null;
    }
    
    const value = control.value;
    
    // Verifica formato MM/YY
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
      return { 'invalidFormat': true };
    }
    
    const [month, year] = value.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const cardYear = parseInt(year);
    const cardMonth = parseInt(month);
    
    // Verifica che la carta non sia scaduta
    if (cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
      return { 'cardExpired': true };
    }
    
    return null;
  }

  // VALIDATORE PERSONALIZZATO PER CVV
  cvvValidator(control: any) {
    if (!control.value) {
      return null;
    }
    
    const cvv = control.value;
    
    // Supporta CVV a 3 cifre (Visa, Mastercard) e 4 cifre (Amex)
    if (!/^\d{3,4}$/.test(cvv)) {
      return { 'invalidCvv': true };
    }
    
    return null;
  }

  // RICONOSCIMENTO TIPO CARTA
  getCardType(cardNumber: string): string {
    const number = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(number)) {
      return 'Visa';
    } else if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) {
      return 'Mastercard';
    } else if (/^3[47]/.test(number)) {
      return 'American Express';
    } else if (/^6/.test(number)) {
      return 'Discover';
    }
    
    return 'Sconosciuta';
  }

  // COMPLETAMENTO ORDINE
  completeOrder(): void {
    // Qui puoi aggiungere la logica per inviare l'ordine al backend
    console.log('Ordine completato:', {
      delivery: {
        nome: this.formData.nome,
        cognome: this.formData.cognome,
        indirizzo: this.formData.indirizzo,
        citta: this.formData.citta,
        cap: this.formData.cap,
        telefono: this.formData.telefono,
        email: this.formData.email,
        spedizione: this.formData.spedizione
      },
      payment: {
        metodo: this.formData.metodoPagamento,
        carta: this.formData.metodoPagamento === 'carta' ? this.paymentForm.value : null
      },
      cart: this.cart,
      totale: this.getTotal()
    });

    // Salva il tipo di spedizione e i dati del carrello nel localStorage per la thankyou page
    localStorage.setItem('orderShippingType', this.formData.spedizione || 'standard');
    localStorage.setItem('orderCart', JSON.stringify(this.cart));

    // Svuota il carrello
    this.carrelloService.svuotaCarrello();
    
    // Naviga alla pagina di ringraziamento
    this.router.navigate(['/thankyoupage']);
  }

  // METODI PER IL CARRELLO E TOTALI
  getTotal(): string {
    return this.getTotalWithShipping();
  }

  getSubtotal(): string {
    const subtotal = this.cart.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
    return subtotal.toFixed(2);
  }

  getShippingCost(): string {
    if (this.formData.spedizione === 'express') {
      return '€9.99';
    }
    return 'Gratuita';
  }

  getTotalWithShipping(): string {
    const subtotal = parseFloat(this.getSubtotal());
    const shipping = this.formData.spedizione === 'express' ? 9.99 : 0;
    return (subtotal + shipping).toFixed(2);
  }

  // METODI DI UTILITÀ
  getLastFourDigits(): string {
    const cardNumber = this.paymentForm.get('cardNumber')?.value;
    if (cardNumber && cardNumber.length >= 4) {
      return cardNumber.slice(-4);
    }
    return '****';
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    if (formattedValue.length <= 23) { // 19 digits + 4 spaces max
      event.target.value = formattedValue;
      this.paymentForm.get('cardNumber')?.setValue(value, { emitEvent: false });
    }
  }

  // FORMATTAZIONE AUTOMATICA DATA SCADENZA
  formatExpiryDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    event.target.value = value;
    this.paymentForm.get('expiryDate')?.setValue(value, { emitEvent: false });
  }

  // LIMITAZIONE INPUT CVV
  formatCvv(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    
    // Limita a 4 cifre massimo
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    
    event.target.value = value;
    this.paymentForm.get('cvv')?.setValue(value, { emitEvent: false });
  }

  // Metodi di navigazione per la navbar
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToCart(): void {
    this.router.navigate(['/carrello']);
  }
}
  
  





