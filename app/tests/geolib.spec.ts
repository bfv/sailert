
import { GeoPoint } from '../shared/geopoint';

describe('Geolib', () => {

    it('conversion deg->rad', () => {
        const geoPoint = new GeoPoint(0, 90);
        expect(geoPoint.lonrad).toBeCloseTo(Math.PI * 0.5);
    });

});
