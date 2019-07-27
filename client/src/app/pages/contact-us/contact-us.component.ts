import { Component, OnInit, ViewChild } from '@angular/core';
import { config } from 'src/environments/config';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactData = {
    name: '',
    email: '',
    description: '',
    captcha: ''
  };

  public urlSubmitting = false;
  public msg = '';
  public submitSuccess = true;
  public recaptchaSiteKey = config.RECAPTCHA_SITE_KEY;

  @ViewChild('captchaRef', { static: false }) captchaRef;

  constructor(
    private networkService: NetworkService) { }

  ngOnInit() {
  }

  submitPress() {
    if (this.contactData.description.length > 0 && !this.urlSubmitting) {
      this.urlSubmitting = true;
      this.captchaRef.reset();
      this.captchaRef.execute();
    }
  }

  submitContact() {
    if (this.contactData.name.length < 1 || this.contactData.email.length < 1 ||
      this.contactData.description.length < 1 || this.contactData.captcha === null) {
      return;
    }
    this.urlSubmitting = true;
    this.networkService.contactSubmit(this.contactData).subscribe(
      res => {
        this.urlSubmitting = false;
        this.submitSuccess = true;
        this.msg = res.message;
        this.contactData.name = '';
        this.contactData.email = '';
        this.contactData.description = '';
        this.contactData.captcha = '';
      },
      err => {
        this.submitSuccess = false;
        this.urlSubmitting = false;
        this.msg = err.error.message;
      }
    );
  }

}
