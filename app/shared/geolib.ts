
import { GeoPoint } from './geopoint';

export interface Route {
    start: GeoPoint;
    end: GeoPoint;
    distance: number;
    initialBaring: number;
    finalBaring: number;
}

export function calculateRoute(start: GeoPoint, end: GeoPoint): Route {

    let distance: number;

    distance = haversine(start, end);

    return {
        distance: distance,
        end: end,
        finalBaring: 0,
        initialBaring: 0,
        start: start,
    };

}

export const earthRadius: number = 6371000;

/*
Haversine
formula:	a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
c = 2 ⋅ atan2( √a, √(1−a) )
d = R ⋅ c
where	φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
note that angles need to be in radians to pass to trig functions!
*/

function haversine(start: GeoPoint, end: GeoPoint): number {

    let distance: number;

    console.log('start: ', start.toString());
    console.log('end: ', end.toString());

    const a = Math.pow(Math.sin((end.latrad - start.latrad) / 2), 2) +
        Math.cos(start.latrad) *
        Math.cos(end.latrad) *
        Math.pow(Math.sin((end.lonrad - start.lonrad) / 2), 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distance = earthRadius * c;

    return distance;
}
