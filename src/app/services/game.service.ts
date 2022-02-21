import { Injectable } from '@angular/core';
import { Observable, of, Subject, firstValueFrom } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Game } from '../game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  //JSON-server deployed on heroku was used as backend for the app.
  private serverURL: string = 'https://lab-angular-json-server.herokuapp.com';
  
  constructor(private http: HttpClient) { }

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.serverURL + '/games').pipe(
      tap(_ => this.log('fetched games')),
      catchError(this.handleError<Game[]>('getGames', []))
    )
  }

   /**
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
