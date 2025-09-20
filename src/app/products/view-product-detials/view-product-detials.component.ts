import { Component } from '@angular/core';

@Component({
  selector: 'app-view-product-detials',
  templateUrl: './view-product-detials.component.html',
  styleUrls: ['./view-product-detials.component.css'],
})
export class ViewProductDetialsComponent {
  product = {
    name: 'Royal Diamond Ring',
    price: 125000,
    grossWeight: 17.85,
    items: [
      {
        category: 'Gold',
        subcategory: '22K Yellow Gold',
        quantity: 12.5,
      },
      {
        category: 'Diamond',
        subcategory: 'VVS1 Clarity',
        quantity: 3.2,
      },
      {
        category: 'Silver',
        subcategory: 'Sterling Silver',
        quantity: 2.15,
      },
    ],
  };

  getMaterialIcon(category: string): string {
    switch (category.toLowerCase()) {
      case 'gold':
        return '🪙';
      case 'diamond':
        return '💎';
      case 'silver':
        return '⚪️';
      case 'platinum':
        return '🔗';
      default:
        return '🔹';
    }
  }
}
