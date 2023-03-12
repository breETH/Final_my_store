import { Injectable } from '@angular/core';
import { items } from '../models/items';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
   items:items[] = [];
   apiUrl = 'http://localhost:4200/assets/data.json';
   

  constructor(private http: HttpClient) { }

  getProduct(){
    return this.http.get('../../assets/data.json');
  }

   getDetail() {
    return this.items;
  }

  addToDetail(items: items) {
    this.items.push(items);
    return this.items;
  }

  getProductById(id: number): items {
      const found: items | undefined = this.items.find(p => p.id == id);
      if (found) return found;
      else return new items();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getProductByID(id: number): Observable<items> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<items>(url)
      .pipe(catchError(this.handleError<items>(`getProduct id=${id}`)));
  } 

}
