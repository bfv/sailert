
import { GeoPoint } from './../shared/geopoint';
import { TrackPoint } from './../shared/trackpoint';
import { AppSettings } from './../shared/appsettings';

export interface AppState {
    speed: number;
    course: number;
    position: GeoPoint;
    tracklog: TrackPoint[];
    settings: AppSettings;
}