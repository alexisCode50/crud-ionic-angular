import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products = [
    {id: 701, name: 'Patata', price: 30, stock: 100},
    {id: 702, name: 'Soda', price: 10, stock: 50},
    {id: 703, name: 'Chips', price: 8, stock: 200},
    {id: 704, name: 'Mexican Food', price: 80, stock: 30},
  ];

  countItems = new BehaviorSubject(0);

  constructor() { }

  getProducts(){
    return this.products;
  }

  getCountProducts(){
    let totalItems = this.products.length;
    this.countItems.next(totalItems);
    return this.countItems;
  }

  getProduct(id){
    return this.products.find(item => item.id == id);
  }

  addProduct(product){
    this.countItems.next(this.countItems.value + 1);
    return this.products.push(product);
  }

  updateProduct(id, product){
    let index = this.products.findIndex(item => item.id == id);
    return this.products.splice(index, 1, product);
  }

  deleteProduct(id){
    let product = this.products.findIndex(item => item.id === id);
    this.countItems.next(this.countItems.value - 1);
    return this.products.splice(product, 1);
  }

}
