import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = -1;
  housingService = inject(HousingService)
  housingLocation: HousingLocation = {
    id: 0,
    name: "",
    city: "",
    state: "",
    photo: "",
    availableUnits: 0,
    wifi: false,
    laundry: false,
  };
  applyForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });;

  constructor(private messageService: MessagesService) { }

  ngOnInit() : void {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
    this.messageService.add(
      `DetailsComponent: Received detail request for listing ID: ${housingLocationId}`);
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }

  updateAvailability() {
    if (this.housingLocation) {
      this.housingService.updateAvailability(
        this.housingLocation.id, 
        this.housingLocation.availableUnits);
    }
  }
}
