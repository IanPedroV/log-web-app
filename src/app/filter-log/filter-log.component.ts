import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Log } from '../models/log';
import { Subject } from 'rxjs';
import { LogServiceService } from '../services/log-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter-log',
  templateUrl: './filter-log.component.html',
  styleUrls: ['./filter-log.component.css']
})
export class FilterLogComponent implements OnInit {
  results: Array<Log>;
  searchTerm$ = new Subject<string>();
  public static searchField: string = 'ip';
  headers = ['id', 'ip', 'date', 'userAgent', 'status'];
  formGroup: FormGroup;

  constructor(private logService: LogServiceService) {
    // console.log('%c AppComponent', 'color: green; font-weight: bold');
    this.searchTerm$.subscribe(inputData => {
      // console.log('=> searchTerm$ inputData: ', inputData);
    });
    this.logService.search(this.searchTerm$).subscribe(results => {
      this.results = results;
      // console.log('%c AppComponent', 'color: green; font-weight: bold');
      // console.log('=> results: ', this.results);
    });

    this.formGroup = new FormGroup({
      dateRange: new FormControl('', [
        Validators.pattern(
          /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]).\d\d\d_[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]).\d\d\d/
        )
      ]),
      ip: new FormControl('', [Validators.pattern(/\d*\.\d*/)])
    });
  }

  changeSearchField(event) {
    FilterLogComponent.searchField = event.target.value;
    this.formGroup.reset();
    this.results = []
  }

  onKeyUp(event) {
    if (this.formGroup.valid) {
      let value = event.target.value;
      if (event.target.id.toString() == 'dateRange') {
        value = value
          .replace('_', '&date2=')
          .split(' ')
          .join('%20')
        this.searchTerm$.next(value);
      } else this.searchTerm$.next(value);
    }
  }

  getSearchField() {
    return FilterLogComponent.searchField;
  }

  ngOnInit(): void {}
}
