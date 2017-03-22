import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'latitudedegrees' })
export class LatitudeDegrees implements PipeTransform {

    transform(degrees: number, type: string): string {

        type = setDefaults(type);

        let hemisphere = (type.substr(0, 1) == 'h');
        if (hemisphere) {
            type = type.substr(1);
        }

        let precision = getDefaultPrecision(type);

        let colonPos = type.indexOf(':');
        if (colonPos > 0) {
            precision = parseInt(type.substr(colonPos + 1));
            type = type.substr(0, colonPos);
        }

        let converted = convert(degrees, type, precision);

        if (hemisphere) {
            if (degrees >= 0.0) {
                converted = 'N' + converted;
            }
            else {
                converted = 'S' + converted.substr(1);
            }
        }

        return converted;
    }

}

@Pipe({ name: 'longitudedegrees' })
export class LongitudeDegreesPipe implements PipeTransform {

    transform(degrees: number, type: string): string {

        type = setDefaults(type);
        console.log('Longitude: ', type);
        let hemisphere = (type.substr(0, 1) == 'h');
        if (hemisphere) {
            type = type.substr(1);
        }

        let precision = getDefaultPrecision(type);

        let colonPos = type.indexOf(':');
        if (colonPos > 0) {
            precision = parseInt(type.substr(colonPos + 1));
            type = type.substr(0, colonPos);
        }
        console.log(degrees, type, precision);
        let converted = convert(degrees, type, precision);

        if (hemisphere) {
            if (degrees >= 0.0) {
                converted = 'E' + converted;
            }
            else {
                converted = 'W' + converted.substr(1);
            }
        }

        return converted;
    }
}

function convert(degrees: number, type: string, precision: number): string {

    let converted: string;

    switch (type) {

        case 'deg' || 'hdeg':
            converted = convertDeg(degrees, precision);
            break;

        case 'min' || 'hmin':
            converted = convertMin(degrees, precision);
            break;

        case 'sec' || 'hsec':
            converted = convertSec(degrees, precision);
            break;

        default:
            converted = 'error conversion type (deg/min/sec)';
    }

    return converted;
}


function convertDeg(degrees: number, precision: number): string {

    let converted: string;

    converted = degrees.toFixed(precision);

    return converted + '\u00B0';
}


function convertMin(degrees: number, precision: number): string {

    let converted: string;
    let deg, min: number;

    deg = degrees >= 0.0 ? Math.floor(degrees) : Math.ceil(degrees);
    min = Math.abs((degrees - deg) * 60);

    converted = deg.toFixed(0) + '\u00B0' + min.toFixed(precision) + "'";

    return converted;
}


function convertSec(degrees: number, precision: number): string {

    let converted: string;
    let deg, min, sec: number;

    deg = degrees >= 0.0 ? Math.floor(degrees) : Math.ceil(degrees);
    min = Math.abs((degrees - deg) * 60);
    sec = (min - Math.floor(min)) * 60;

    converted = deg.toFixed(0) + '\u00B0' + Math.floor(min).toFixed(0) + '\'' + sec.toFixed(precision) + '"';

    return converted;
}


function getDefaultPrecision(type: string): number {

    let precision;

    switch (type.substr(0, 3)) {
        case 'deg':
            precision = 5;
            break;
        case 'min':
            precision = 3;
            break;
        case 'sec':
            precision = 1;
            break;
    }

    return precision;
}

function setDefaults(type: string): string {

    console.log('setDefault in:', type);
    switch (type) {
        case 'deg' || 'degrees':
            type = 'hdeg:5';
            break;
        case 'min' || 'minutes':
            type = 'hmin:3';
            break;
        case 'sec' || 'seconds':
            type = 'hsec:1';
            break;
    }

    if (type == '' || type == undefined) {
        type = 'hdeg:5';
    }

    return type;
}