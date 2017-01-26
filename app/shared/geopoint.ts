export class GeoPoint {

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    get latitude(): number {
        return (this.latrad / Math.PI) * 180;
    }
    set latitude(degrees) {
        this.latrad = (degrees / 180) * Math.PI;
    }

    get longitude(): number {
        return (this.lonrad / Math.PI) * 180;
    }
    set longitude(degrees) {
        this.lonrad = (degrees / 180) * Math.PI;
    }

    public latrad: number;
    public lonrad: number;

    toString(): string {
        return 'lat: ' + this.latitude.toFixed(7) + ' (' + this.latrad.toFixed(7) + 'rad), lon: ' + this.longitude.toFixed(7) + ' (' + this.lonrad.toFixed(7) + 'rad)';
    }
}
