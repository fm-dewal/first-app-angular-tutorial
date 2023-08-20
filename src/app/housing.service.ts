import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HousingService { 
  locationsUrl = 'http://localhost:3000/locations';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(
    private messageService: MessagesService, private http: HttpClient) {}//private httpClient: HttpClient){}//, ) { }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      this.messageService.add(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.locationsUrl)
  }

  getHousingLocationById(id: number): Observable<HousingLocation> {
    this.messageService.add(`HousingService: fetching housing location for id ${id}`);
    return this.http.get<HousingLocation>(`${this.locationsUrl}/${id}`).pipe(
      tap(_ => this.messageService.add(`Housing Service: Fetched location id=${id}`)),
      catchError(this.handleError<HousingLocation>(`getHero id=${id}`))
    );
  }

  submitApplication(firstName: string, lastName: string, email:string) {
    this.messageService.add(`Homes application received: firstName: ${firstName} lastName: ${lastName} email: ${email}.`);
  }

  updateAvailability(id:number, unitsAvailable: number) {
    this.messageService.add(`Update availability for home ID ${id} to ${unitsAvailable}`);
    this.http.patch<HousingLocation>(`${this.locationsUrl}/${id}`, {availableUnits: unitsAvailable}, 
      {headers: this.headers})
    .subscribe();
  }
}
