import { RuffVideo } from './../../models/ruffvideo';
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class VideoService {

    private url = "/api/videos";

    private videos: Array<RuffVideo>;

    constructor(private http: Http) { }

    getVideos(): Observable<RuffVideo> {
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addVideo(video: RuffVideo): Observable<RuffVideo> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url, { video }, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateVideo(video: RuffVideo): Observable<RuffVideo> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.url + "/" + video.id, { video }, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteVideo(video: RuffVideo): Observable<RuffVideo> {
        return this.http.delete(this.url + "/" + video.id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}