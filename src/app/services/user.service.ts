import { Injectable, OnInit } from '@angular/core';
import { Observable, of, Subject, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser: User | undefined;  
  userIsLoggedIn = new Subject();

  //JSON-server deployed on heroku was used as backend for the app.
  private serverURL: string = 'https://lab-angular-json-server.herokuapp.com';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }
  
  set currentUser(user: User | undefined) {
    this._currentUser = user;
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }    
  }

  get currentUser(): User | undefined {
    if (this._currentUser === undefined) {      
      let jsonUserData = localStorage.getItem('currentUser');
      if (jsonUserData) {
        this.currentUser = JSON.parse(jsonUserData);        
      }      
    }
    return this._currentUser;
  }  

  // public userIsLoggedIn(): Observable<boolean> {
  //   //const loggedIn = this.currentUser ? true : false;
  //   return this.userIsLoggedIn;
  // }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serverURL + '/users').pipe(      
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  public updateUser(user: User): Observable<any> {
    const userData = {...user};
    delete userData.id;
    return this.http.put(this.serverURL + '/users/' + user.id, userData, this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  private async asyncGetUsers() {
    return await firstValueFrom(this.getUsers());
  } 

  public addUser(email: string, password: string): Observable<User> {
    let users: User[] = [];
    this.asyncGetUsers().then(res => users = res);
    let id: number = 1;
    if (users) {
      id = Math.max(...users.map<number>(user => user.id!)) + 1
    }
    
    const newUser: User = {
      id,
      username: '',
      age: 0,
      email,
      password
    }
    
    return this.http.post<User>(this.serverURL + '/users', newUser, this.httpOptions).pipe(
      tap(_ => this.log(`added new user id=${newUser.id}`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

   /** THE HEROES TUTORIAL HAS BEEN USED IN THE CREATION OF THIS SERVICE
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);  
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  
    private log(message: string) {
      console.log(`UserService: ${message}`);
    }
}
