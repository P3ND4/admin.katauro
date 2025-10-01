import { Component } from '@angular/core';
import { Category } from '../../../shared/models/Product';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

  CategoryFilter: Category[] = [
    Category.tableLumin,
  ];
}
