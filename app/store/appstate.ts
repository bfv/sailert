
import { GeoPoint } from './../shared/geopoint';

export interface AppState {
    speed: number;
    course: number;
    position: GeoPoint;
}