import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {

    this.auth.isLoggedIn().subscribe(loggedIn => {
      if (!loggedIn) this.auth.login();
    });

  }

}