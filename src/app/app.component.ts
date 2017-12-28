import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  firstname;
  lastname;
  record;

  constructor(
    @Inject('deepstream') private dp,
    private router: Router
  ) { }

  ngOnInit() {
  }

  goSet() {
    this.router.navigate([{ outlets: { primary: 'setting/user', sidebar: 'setting' } }]);
  }

  logOut() {
    // this.dp.logOut();
  }

  handleFnameChange(val) {
    this.record.set('firstname', val);
  }

  handleLnameChange(val) {
    this.record.set('lastname', val);
  }
}
