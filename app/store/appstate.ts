
import { AppSettings } from './../shared/appsettings';
import { GeoPoint } from './../shared/geopoint';
import { TrackPoint } from './../shared/trackpoint';

export interface AppState {
    speed: number;
    course: number;
    position: GeoPoint;
    tracklog: TrackPoint[];
    settings: AppSettings;
}
