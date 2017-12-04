import { Dimensions } from "react-native";

export class MapCoordinatesData implements MapCoordinates {
    public latitude: number;
    public longitude: number;
    public latitudeDelta: number;
    public longitudeDelta: number;
    private locationDelta: LocationDelta;

    constructor(latitude: number, longitude: number, ) {
            this.initializeDeltaLocation();

            this.latitude = latitude;
            this.longitude = longitude;
            this.latitudeDelta = this.locationDelta.longitudDelta;
            this.longitudeDelta = this.locationDelta.latitudDelta;
    }

    public getCoordinates(): MapCoordinates {
        return {
            latitude:  this.latitude,
            longitude: this.longitude,
            latitudeDelta: this.latitudeDelta,
            longitudeDelta: this.longitudeDelta,
        };
    }

    private initializeDeltaLocation(): void {
        const base = 0.0922;
        const {width, height} = Dimensions.get('window');

        this.locationDelta = {
            latitudDelta: base,
            longitudDelta: base * (width / height)
        }
    }

}

export const GeoOptions = {enableHighAccuracy: false, timeout: 20000,};