import { Component, computed, inject } from '@angular/core';
import { Storage } from '../../services/storage';

@Component({
  imports: [],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private storage = inject(Storage);
  totalProducts = computed(() => (this.storage.get<any[]>('products') || []).length);
  totalCategories = computed(() => (this.storage.get<any[]>('categories') || []).length);
  totalOrders = computed(() => (this.storage.get<any[]>('orders') || []).length);
}
