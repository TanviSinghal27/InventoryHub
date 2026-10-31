import { Component, inject, signal } from '@angular/core';
import { Storage } from '../../services/storage';
import { Order } from '../../interfaces/order';

@Component({
  imports: [],
  selector: 'app-order',
  styleUrl: './order.css',
  templateUrl: './order.html',
})
export class OrderComponent {
  private storage = inject(Storage);
  orders = signal<Order[]>(
    this.storage.get<Order[]>('orders') || [
      { id: '1001', customer: 'Rahul Sharma', total: 299, status: 'Pending' },
      { id: '1002', customer: 'Priya Sharma', total: 499, status: 'Shipped' },
    ],
  );

  constructor() {
    if (!this.storage.get('order')) {
      this.storage.set('orders', this.orders());
    }
  }
}
