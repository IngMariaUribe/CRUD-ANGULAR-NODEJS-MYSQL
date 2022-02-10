import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL_API = 'http://localhost:4000';

  constructor(private http: HttpClient) {
  }

  //Product observable functions
  getProduct(): Observable<any> {
    return this.http.get(`${this.URL_API}/products/read`);
  }
  consultProduct(data: any, id: number | null): Observable<any> {
    return this.http.get(`${this.URL_API}/products/consult/${id}`);
  }
  insertProduct(data: any): Observable<any> {
    return this.http.post(`${this.URL_API}/products/create`, data);
  }

  updateProduct(data: any, id: number | null): Observable<any> {
    return this.http.put(`${this.URL_API}/products/update/${id}`, data);
  }

  deleteProduct(data: any, id: number | null): Observable<any> {
    return this.http.delete(`${this.URL_API}/products/delete/${id}`, data);
  }

  //Provider observable functions
  getProvider(): Observable<any> {
    return this.http.get(`${this.URL_API}/providers/read`);
  }
  insertProvider(data: any): Observable<any> {
    return this.http.post(`${this.URL_API}/providers/create`, data);
  }
  updateProvider(data: any, id: number | null): Observable<any> {
    return this.http.put(`${this.URL_API}/providers/update/${id}`, data);
  }
  deleteProvider(data: any, id: number | null): Observable<any> {
    return this.http.delete(`${this.URL_API}/providers/delete/${id}`, data);
  }

  //categoryes
  getCategory(): Observable<any> {
    return this.http.get(`${this.URL_API}/category/read`);
  }

}
