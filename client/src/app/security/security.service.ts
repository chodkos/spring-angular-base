import {Injectable} from '@angular/core';
import {Http, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import "rxjs/add/operator/mergeMap";
import {Api} from '../api';
import {User} from './user';

@Injectable()
export class SecurityService {

  user: Observable<User>


  events: Observable<boolean>;

  private authenticationEvents = new BehaviorSubject<boolean>(false);


  constructor(private http: Http, private requestOptions: RequestOptions, private api: Api) {
    this.events = this.authenticationEvents.asObservable()
    let token = sessionStorage.getItem('token')
    if(token){
      this.setAuthorizationToken(token);
      this.authenticationEvents.next(true);
    }
  }


  isAuthenticated(): boolean{
    return this.authenticationEvents.getValue();
  }



  login(username: string, password: string): Observable<boolean> {
    let payload = this.preparePayload(username, password);
    return this.http.post(this.api.oauthServer, payload)
      .map(response => response.json())
      .map(json => json.access_token)
      .do(token => this.onLoginSuccess(token))
      .mapTo(true)
  }

  private onLoginSuccess(token: string) {
    this.setAuthorizationToken(token);
    sessionStorage.setItem('token', token);
    this.authenticationEvents.next(true)
  }

  logout() {
    this.removeAuthorizationHeader();
    this.authenticationEvents.next(false)
    sessionStorage.removeItem('token');
  }

  private removeAuthorizationHeader() {
    this.requestOptions.headers.delete('Authorization')
  }

  private setAuthorizationToken(token: string) {
    this.requestOptions.headers.set('Authorization', `Bearer ${token}`)
  }

  private preparePayload(username: string, password: string): URLSearchParams {
    let payload = new URLSearchParams()
    payload.set('username', username)
    payload.set('password', password)
    payload.set('grant_type', 'password')
    payload.set('client_id', 'connect-app')
    return payload
  }



}
