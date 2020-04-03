import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Log } from '../models/log';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FilterLogComponent } from '../filter-log/filter-log.component';

const API = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class LogServiceService {
  constructor(private httpClient: HttpClient) {}

  addLogByFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('uploadFile', file);
    return this.httpClient.post<string>(API + '/logs/upload', formData);
  }

  addLog(log: Log): Observable<string> {
    return this.httpClient.post<string>(API + '/logs', log, {});
  }

  search(terms: Observable<string>): any {
    // console.log('%c SearchService', 'color: green; font-weight: bold');
    // console.log(
    //   '%c search(terms: Observable<string>)',
    //   'color: red; font-weight: bold'
    // );
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchEntries(term))
    );
  }

  searchEntries(term: string): Observable<object> {
    // console.log(
    //   '%c searchEntries(terms: string)',
    //   'color: red; font-weight: bold'
    // );
    // console.log('=> term: ', term);
    if (term === '') {
      return of({});
    }
    const searchField = FilterLogComponent.searchField == 'dateRange' ?  'data1' : FilterLogComponent.searchField
    const url = `${API}/logs?${searchField}=${term}`;
    console.log('=> url: ', url);
    return this.httpClient.get(url);
  }


}
