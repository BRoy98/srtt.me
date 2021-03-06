import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { config } from 'src/environments/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  urlData = {
    url: '',
    captcha: ''
  };

  public warnMsg = '';
  public localUrls = [];
  public urlSubmitting = false;
  public recaptchaSiteKey = config.RECAPTCHA_SITE_KEY;

  @ViewChild('captchaRef', { static: false }) captchaRef;

  constructor(
    private networkService: NetworkService,
    public router: Router
  ) { }

  ngOnInit() {
    if (this.networkService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
    const localData = JSON.parse(localStorage.getItem('local_urls'));
    this.localUrls = localData === null ? [] : localData;
  }

  submitPress() {
    this.warnMsg = '';
    if (this.urlData.url.length > 0) {
      this.urlSubmitting = true;
      this.captchaRef.reset();
      this.captchaRef.execute();
    }
  }

  submitUrl() {
    if (this.urlData.url.length < 1 || this.urlData.captcha === null) {
      return;
    }
    this.urlSubmitting = true;
    this.networkService.newUrl(this.urlData).subscribe(
      res => {
        let localData = JSON.parse(localStorage.getItem('local_urls'));
        if (!localData) {
          localData = [];
        }
        localData.push(res.urlData);
        localStorage.setItem('local_urls', JSON.stringify(localData));
        this.localUrls = localData;
        this.urlSubmitting = false;
      },
      err => {
        this.warnMsg = err.error.error;
        this.urlSubmitting = false;
      }
    );
  }

}
