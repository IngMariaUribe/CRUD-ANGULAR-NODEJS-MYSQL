import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Provider } from 'src/app/models/provider';
import { ProductService } from './../../services/product.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent implements OnInit {

  //local variables
    provider: Provider = {
    id: 0,
    provider: '',
    celphone: 0,
    mail: ''
  }

  providers: Provider[] = [];
  
  //Form new provider
  providerForm = new FormGroup({
    provider: new FormControl(''),
    celphone: new FormControl(''),
    mail: new FormControl('')
  });

  constructor(private service: ProductService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.provider = this.providerForm.value;
    if (this.provider != null) {
      console.log(this.provider);
      this.createProvider(this.provider);
    }
    
  }

  createProvider(provider: Provider) {
    this.service.insertProvider(provider).subscribe((data: any) => {
      this.provider = data;
      console.log('data');
      console.log(data);
    });
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Nuevo proveedor registrado',
      showConfirmButton: false,
      timer: 2500
    });
  }

  readProvider(provider: Provider) {
    this.service.getProvider().subscribe((data: any) => {
      this.providers = data;

    })
    console.log(this.providers);
  }

  deleteProvider(provider: Provider) {
    this.service.deleteProvider(provider, provider.id).subscribe((data: any) => {
      this.provider = data;
      console.log(data);
    })
  }

  updateProvider(provider: Provider) {
    this.service.updateProvider(provider, provider.id).subscribe((data: any) => {
      this.provider = data;
      console.log(data);
    })
  }
  /*
    ObjectElementToList(provider: Provider, list: string[]): string[] {
      this.readProvider(provider);
      console.log(provider);
      var numbers = [1, 4, 9]; 
      var roots = provider.map(provider.provider); 
      console.log("roots is : " + roots );
      this.http.get('http://localhost/ionicapis/public/api/products').pipe(map((response: any) => provider));
    
        this.http.get('https://example.com/api/items').pipe(map(data => {})).subscribe(result => {
          console.log(result);
       
      //list[1]=(provider.provider);
      //window.alert(list[1]);
      //console.log('list');
  
     // console.log(list);
      //provider.forEach(function (value) {
       // list.push(provider(value).provider);
      //  console.log(value);
      //});
    
      return list;
    }*/

}
