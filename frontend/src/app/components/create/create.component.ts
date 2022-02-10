import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from './../../services/product.service';
import { Provider } from './../../models/provider';
import { Category } from './../../models/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  product: Product | null = null;
  providers: Provider[] = [];
  categories: Category[] = [];

  provider: Provider = {
    id: 0,
    provider: '',
    celphone: 0,
    mail: ''
  }
  category: Category = {
    id: 0,
    category: '',
    sub: ''
  }

  //Form group datos nuevo registro
  productForm = new FormGroup({
    product: new FormControl(''),
    category: new FormControl(''),
    subcategory: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    provider: new FormControl(''),
    observations: new FormControl(''),
  });

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.readProvider(this.provider);
    this.readCategory(this.category);
  }

  //onSubmit gel group form
  onSubmit() {
    this.product = this.productForm.value;
    if (this.product != null) {
      console.log(this.product);
      this.createProduct(this.product);
    }
  }

  createProduct(product: Product) {
    this.service.insertProduct(product).subscribe((data: any) => {
      this.product = data;
    });
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Registro creado',
      showConfirmButton: false,
      timer: 2500
    });
  
  }
  readProvider(provider: Provider) {
    this.service.getProvider().subscribe((data: any) => {
      this.providers = data;
    })
  }
  readCategory(category1: Category) {
    this.service.getCategory().subscribe((data: any) => {
      //this.categories.push(category1.category);
      this.categories=data;
    })
    console.log(this.categories);
  }
}
