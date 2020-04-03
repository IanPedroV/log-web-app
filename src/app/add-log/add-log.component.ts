import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LogServiceService } from '../services/log-service.service';
import { Log } from '../models/log';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-log',
  templateUrl: './add-log.component.html',
  styleUrls: ['./add-log.component.css']
})
export class AddLogComponent implements OnInit {
  formGroupUpload: FormGroup;
  formGroupRaw: FormGroup;
  popOverDescription: string;
  uploadSuccess: boolean;
  rawLogSuccess: boolean;
  date: string;
  ip: string;
  request: string;
  code: string;
  userAgent: string;
  file: File;

  constructor(private logService: LogServiceService) {

  }

  ngOnInit(): void {
    this.formGroupUpload = new FormGroup({
      file: new FormControl('', [Validators.required])
    });

    this.formGroupRaw = new FormGroup({
      date: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]).\d\d\d/
        )
      ]),
      ip: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        )
      ]),
      request: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /"(GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH)\s+([^?\s]+)((?:[?&][^&\s]+)*)\s+(HTTP.*?)"/
        )
      ]),
      code: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-5][0-9][0-9]$/)
      ]),
      userAgent: new FormControl('', [Validators.required, Validators.min(50)])
    });
    this.popOverDescription =
      'yyyy-mm-dd hh:mm:ss.SSS|IP|"REQUEST"|CODE|"USERAGENT" ' +
      'Example: 2019-01-01 23:59:41.019|192.168.52.153|"GET / HTTP/1.1"|200|"Mozilla/5.0 (Windows NT 6.1; WOW64) SkypeUriPreview Preview/0.5"';

    this.uploadSuccess = false;
  }

  onUploadSubmit() {
    this.logService
      .addLogByFile(this.file)
      .subscribe(() => (this.uploadSuccess = true));
    setTimeout(() => {
      this.uploadSuccess = false;
    }, 5000);
  }

  onRawLogSubmit() {
    let log: Log = {
      date: this.date,
      ip: this.ip,
      request: this.request,
      code: parseInt(this.code),
      userAgent: this.userAgent
    };
    this.logService.addLog(log).subscribe(() => (this.rawLogSuccess = true));
    setTimeout(() => {
      this.rawLogSuccess = false;
    }, 5000);
  }

  isFormValidFormUpload() {
    return this.formGroupUpload.valid;
  }
  isValidFormRaw() {
    return this.formGroupRaw.valid;
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }
}
