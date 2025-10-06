import { Component, OnInit } from '@angular/core';
import { Category, Product, Typology } from '../../../shared/models/Product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  count = 0;
  products: Product[] = [];

  pagesArray = [1];
  pages = 1;
  currentPage = 1;

  private CatParser = [
    Category.footLumin,
    Category.lightBulb,
    Category.roofLumin,
    Category.tableLumin,
    Category.wallLumin
  ]

  CategoryFilter: Category[] = [
    
  ];

  queryParamSubs: Subscription | undefined;

  constructor(readonly router: Router, private route: ActivatedRoute) {
    this.products.push({
      id: "ajyyhsbodihjbqouh",
      name: "tubo e lu fria",
      description: "un tubo que alumbra y no se calienta",
      details: [],
      subtitle: '',
      typology: Typology.variant,
      finish: [],
      vector: "/assets/bombillo.svg",
      category: { id: 'asda', nombre: Category.footLumin },
      variants: [{
        variantName: "",
        price: 200,
        stock: 13,
        image: "/assets/Image.png",
        images: [],
        id: ""
      }]
    });
  }
  ngOnInit(): void {
    this.queryParamSubs = this.route.queryParamMap.subscribe(()=>{
      this.ReadData();

    })
  }


  private ReadData(){
    const cat = this.route.snapshot.queryParamMap.get('categories');
    if (cat) {
      this.CategoryFilter = [];
      const catList = cat.split('-');
      catList.map((x: string)=>this.CategoryFilter.push(this.CatParser[+x < 5 && 0<= +x ? +x: 1]))
    }
  }



  getStock(prod: Product): number {
    return prod.variants.reduce((acc, variant) => acc + variant.stock, 0);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    console.log(page);
  }

  onDeleteFilter(index: number){
    this.CategoryFilter.splice(index, 1);
    this.router.navigate([],{queryParams: {categories: this.CategoryFilter.map(x=>this.CatParser.indexOf(x)).join('-')}, queryParamsHandling: 'merge'});
  }

}
