export interface HousingLocation {
    id: number;
    name: string;
    city: string;
    state: string;
    photo: string;
    ownerId: number;
    availableUnits: number;
    wifi: boolean;
    laundry: boolean;
}
