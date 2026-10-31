import { Component, inject, signal, computed } from '@angular/core';
import { Storage } from '../../services/storage';
import { ToastService } from '../../services/toast';
import { FormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category';

@Component({
  imports: [FormsModule],
  selector: 'app-category',
  styleUrl: './category.css',
  templateUrl: './category.html',
})
export class CategoryComponent {
  private storage = inject(Storage);
  private toast = inject(ToastService);
  categories = signal<Category[]>(this.storage.get<Category[]>('categories') || []);
  searchQuery = signal('');

  filteredCategories = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return this.categories().filter((c) => c.name.toLowerCase().includes(q));
  });

  deleteCategory(id: number) {
    const updated = this.categories().filter((c) => c.id !== id);
    this.categories.set(updated);
    this.storage.set('categories', updated);
    this.toast.show('Category deleted');
  }

  openModal(cat?: Category) {
    const name = prompt('Enter category name:', cat?.name || '');
    if (!name) return;
    let updated;
    if (cat) {
      updated = this.categories().map((c) => (c.id === cat.id ? { ...c, name } : c));
    } else {
      updated = [...this.categories(), { id: Date.now(), name }];
    }

    this.categories.set(updated);
    this.storage.set('categories', updated);
    this.toast.show(cat ? 'Category updated' : 'Category added');
  }
}
