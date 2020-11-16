import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from './../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    private service:ProductService
    ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    })
  }

  onSubmit(){
    if(this.productForm.valid){
      this.service.addProduct(this.productForm.value);
      this.route.navigate(['home']);
    }
  }

}
