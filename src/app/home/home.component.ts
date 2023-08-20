import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { MessagesService } from '../messages.service';
import { MessagesComponent } from '../messages/messages.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,
    MessagesComponent,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  constructor(private housingService: HousingService, private messageService: MessagesService) { }

  ngOnInit(): void {
    this.housingService.getAllHousingLocations().subscribe((housingLocationList:HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;  
      });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
    
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation.city.toLowerCase().includes(text.toLowerCase())
    );

    this.messageService.add(`HomeComponent: Selected homes in ${text}`)
  }
}
