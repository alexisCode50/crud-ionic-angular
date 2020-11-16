import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from './../../services/product.service';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  id;
  product:any = {};
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private route: Router,
    private activateRouter:ActivatedRoute,
    private service:ProductService
    ) { 
      this.id = this.activateRouter.snapshot.params['id'];
      this.initForm();
    }

  ngOnInit() {
    this.findItem(this.id);
  }

  initForm(){
    this.productForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      stock: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    })
  }

  onSubmit(){
    if(this.productForm.valid){
      console.log(this.productForm.value)
      this.service.updateProduct(this.id, this.productForm.value);
      this.route.navigate(['home']);
    }
  }

  findItem(id){
    this.product = this.service.getProduct(id);
    console.log(this.product);
    this.productForm.patchValue({
      id: this.product.id,
      name : this.product.name,
      price : this.product.price,
      stock : this.product.stock,
    });
  }

}
