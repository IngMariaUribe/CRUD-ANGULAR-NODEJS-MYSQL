import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from './../../services/product.service';
import { Provider } from './../../models/provider';
import { Category } from './../../models/category';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  currentItem: number | null = 28;


  product: Product = {
    id: 10,
    product: '',
    category: '',
    subcategory: '',
    price: 0,
    quantity: 0,
    provider: '',
    observations: '-'
  };
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


  products: Product[] = [];
  providers: Provider[] = [];
  categories: Category[] = [];
  constructor(private service: ProductService) { }
  producto: Product | null = null;

  productFormp = new FormGroup({
    product: new FormControl(''),
    category: new FormControl(''),
    subcategory: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    provider: new FormControl(''),
    observations: new FormControl(''),
  });
  formdefault(p: Product) {
    this.productFormp.patchValue({
      id: p.id,
      product: p.product,
      category: p.category,
      subcategory: p.subcategory,
      price: p.price,
      quantity: p.quantity,
      provider: p.provider,
      observations: this.currentItem
    });
  }
  ngOnInit(): void {
    this.service.getProduct().subscribe((data: any) => {
      this.products = data;
      console.log(data);
    });
    this.readProvider(this.provider);
    this.readCategory(this.category);
  }


  readProducts(product: Product) {
    this.service.getProduct().subscribe((data: any) => {
      this.products = data;
      console.log(data);
    });
  }

  consultProduct(p: Product) {
    this.producto = p;
    this.service.consultProduct(p, p.id).subscribe((data: any) => {
      this.producto = data;
    });
    if (this.producto != null) {
      this.currentItem = this.producto.id;
      this.readProducts(this.producto);
      this.formdefault(this.producto);
      this.producto = p;
    }

  }

  onSubmit2() {
    this.producto = this.productFormp.value;

    if (this.producto != null) {
      this.producto.id = this.currentItem;
      this.editProduct(this.producto);

    } else {
      window.alert('Error');
    }
  }
  deleteProduct(product: Product) {
    Swal.fire({
      title: 'Este registro sera eliminado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado',
          'Este registro ha sido eliminado exitosamente',
          'success'
        )
        this.service.deleteProduct(product, product.id).subscribe((data: any) => {
          this.products = data;
        });
          this.consultProduct(product);
          this.readProducts(product);
      }
    })


  }

  editProduct(product: Product) {

    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Registro actualizado',
      showConfirmButton: false,
      timer: 2500
    });
    this.service.updateProduct(product, product.id).subscribe((data: any) => {
      this.producto = data;
    });
    if (this.producto != null)
      this.consultProduct(this.producto);

  }

  readProvider(provider: Provider) {
    this.service.getProvider().subscribe((data: any) => {
      this.providers = data;

    })
    console.log(this.providers);
  }
  readCategory(category: Category) {
    this.service.getCategory().subscribe((data: any) => {
      this.categories = data;

    })
    console.log(this.categories);
  }

}
