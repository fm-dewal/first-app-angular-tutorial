import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private messageService: MessagesService) {}//private httpClient: HttpClient){}//, ) { }
  
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';
  locationsUrl = 'http://localhost:3000/locations';

  private log(message: string) {
    this.messageService.add(message);
  }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    this.messageService.add("HousingService: fetching all housing locations");
    const data = await fetch(this.locationsUrl);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number) : Promise<HousingLocation> {
    this.messageService.add(`HousingService: fetching housing location for id ${id}`);
    const data = await fetch(`${this.locationsUrl}/${id}`);
    return await data.json() ?? {
      id: 0,
      name: "",
      city: "",
      state: "",
      photo: "",
      availableUnits: 0,
      wifi: false,
      laundry: false,
    };
  }

  submitApplication(firstName: string, lastName: string, email:string) {
    this.messageService.add(`Homes application received: firstName: ${firstName} lastName: ${lastName} email: ${email}.`);
  }

  updateAvailability(id:number, unitsAvailable: number) {
    this.messageService.add(`Update availability for ${id} to ${unitsAvailable}`);
  }
}
