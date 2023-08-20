import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs';

import { HousingLocation } from './housing-location';
import { MessagesService } from './messages.service';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class HousingService { 
  locationsUrl = 'http://localhost:3000/locations';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(
    private errorHandlingService: ErrorHandlingService,
    private messagesService: MessagesService, 
    private http: HttpClient) {}

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.locationsUrl)
  }

  getHousingLocationById(id: number): Observable<HousingLocation> {
    this.messagesService.add(`HousingService: fetching housing location for id ${id}`);
    return this.http.get<HousingLocation>(`${this.locationsUrl}/${id}`).pipe(
      tap(_ => this.messagesService.add(`Housing Service: Fetched location id=${id}`)),
      catchError(this.errorHandlingService.handleError<HousingLocation>(`getHousingLocationById id=${id}`))
    );
  }

  addHousingLocation(housingLocation: HousingLocation, ownerID: number) {
    
  }

  submitApplication(firstName: string, lastName: string, email:string) {
    this.messagesService.add(`Homes application received: firstName: ${firstName} lastName: ${lastName} email: ${email}.`);
  }

  updateAvailability(id:number, unitsAvailable: number) {
    this.messagesService.add(`Update availability for home ID ${id} to ${unitsAvailable}`);
    this.http.patch<HousingLocation>(`${this.locationsUrl}/${id}`, {availableUnits: unitsAvailable}, 
      {headers: this.headers})
    .subscribe();
  }
}
