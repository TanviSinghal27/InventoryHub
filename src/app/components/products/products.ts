import { Component, inject, signal, computed } from '@angular/core';
import { ToastService } from '../../services/toast';
import { Storage } from '../../services/storage';
import { Loading } from '../../services/loading';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';

@Component({
  imports: [FormsModule],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products {
  private storage = inject(Storage);
  private toast = inject(ToastService);
  private loading = inject(Loading);

  products = signal<Product[]>(this.storage.get<Product[]>('products') || []);
  searchQuery = signal<string>('');
  currentPage = signal<number>(1);
  pageSize = 5;
  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.products().filter((p) => p.name.toLowerCase().includes(query));
  });

  paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  totalPages = computed(() => Math.ceil(this.filteredProducts().length / this.pageSize) || 1);

  saveProducts(newProducts: Product[]) {
    this.loading.show();
    setTimeout(() => {
      this.products.set(newProducts);
      this.storage.set('products', newProducts);
      this.loading.hide();
    }, 400);
  }

  deleteProduct(id: number) {
    const updatedProducts = this.products().filter((p) => p.id !== id);
    this.saveProducts(updatedProducts);
    if (updatedProducts.length === 0) {
      this.currentPage.set(1);
    } else {
      const maxPages = Math.ceil(updatedProducts.length / this.pageSize);
      if (this.currentPage() > maxPages) {
        this.currentPage.set(maxPages);
      }
    }
    this.toast.show('Product deleted successfully', 'success');
  }
  openModal(products?: Product) {
    const name = prompt('Enter product name: ', products?.name || '');
    const price = Number(prompt('Enter product price:', products?.price?.toString() || '0'));
    if (name == null) return;
    if (!name.trim()) return;
    if (products) {
      this.saveProducts(
        this.products().map((p) => (p.id === products.id ? { ...p, name, price } : p)),
      );
      this.toast.show('Product updated', 'success');
    } else {
      this.saveProducts([...this.products(), { id: Date.now(), name, price, categoryId: 1 }]);
      this.toast.show('Product added', 'success');
    }
  }
}
