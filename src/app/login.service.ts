import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { MessagesService } from './messages.service';
import { Users } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = 'http://localhost:3000/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private messagesService: MessagesService) { }

  signup(user: Users) {
  }

  signin(user: Users) {

  }

  // return client as default
  getSigninRole(userId: number) : Observable<string> {
    return from("client");
  }
}
