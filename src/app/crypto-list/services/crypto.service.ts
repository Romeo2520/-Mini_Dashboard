import { Injectable } from '@angular/core';
import { Crypto } from '../../crypto.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';

  constructor(private http: HttpClient) {

  }
getTopCryptos(currentPage: number, perPage: number): Observable<Crypto[]> {
return this.http.get<Crypto[]>(`${this.apiUrl}`,
{
  params: {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: '10',
    page: '1',
    sparkline: 'false'
  }
}
);
}
}
