/* tslint:disable use-pipe-transform-interface */
import { Pipe, PipeTransform } from '@angular/core';
import { IncidentCatg } from '../models/ruffvideo';

@Pipe({ name: 'incidentTime' })
export class IncidentTimePipe implements PipeTransform {
    transform(sec: number) {
        let mins = Math.floor(sec / 60);
        let hours = Math.floor(mins / 60);
        let minutes = 0;
        if (hours > 0) {
            minutes = Math.ceil(mins - (hours * 60));
        } else {
            minutes = mins;
        }
        let seconds = Math.ceil(sec) - (minutes * 60);
        let returnval = '' + (hours > 0 ? hours + ':' : '') +
                    (minutes >= 10 ? minutes : '0' + minutes) + ':' +
                    (seconds > 9 ? seconds : '0' + seconds);
        return returnval;
    }
}

@Pipe({ name: 'incidentCatg' })
export class IncidentCatgPipe implements PipeTransform {
    transform(catg: IncidentCatg) {
        let enumval = IncidentCatg[catg];
        return enumval;
    }
}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(value, args:string[]) : any {
        let keys = [];
        for (var enumMember in value) {
            if (parseInt(enumMember, 10) >= 0) {
                keys.push({key: enumMember, value: value[enumMember]});
            }
        }
        return keys;
    }
}

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
    transform(array: any[], args: string): any[] {
        console.log(array);
        if (!array || array === undefined || array.length === 0) { return null; }
        array.sort((a: any, b: any) => {
            if (a.time < b.time) {
                return -1;
            } else if (a.time > b.time) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}