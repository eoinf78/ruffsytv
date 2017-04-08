import { VideoSession, SessionIncident } from '../../models/session';
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TestService {

    private url = "http://issyvision.ashri.me/issyvision/";

    //private videos: Array<RuffVideo>;

    constructor(private http: Http) { }

    initiateIssyVision(): any {
        return this.http.get(this.url).catch(this.handleError);
    }

    createSession(session: VideoSession): Observable<VideoSession> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(JSON.stringify(session));
        return this.http.post(this.url + 'sessions/', session, options)
                .map(this.extractData)
                .catch(this.handleError);
    }

    stopSession(sessionId): Observable<VideoSession> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url + 'sessions/' + sessionId + '/stop', sessionId, options)
                .map(this.extractData)
                .catch(this.handleError);
    }

    getSession(sessionId): Observable<VideoSession> {
        return this.http.get(this.url + 'sessions/' + sessionId)
                .map(this.extractData)
                .catch(this.handleError);
    }

    getAllSessions(): Observable<VideoSession[]> {
        return this.http.get(this.url + 'sessions')
                .map(this.extractData)
                .catch(this.handleError);
    }

    saveInsight(sessionId, insight: SessionIncident): Observable<SessionIncident> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(JSON.stringify(insight));
        return this.http.post(this.url + 'sessions/' + sessionId + '/insights', insight, options)
                .map(this.extractData)
                .catch(this.handleError);

    }

    private extractData(res: Response) {
        let body = res.json();

        return body.data || body || {};
    }

    private handleError(error: Response | any) {
        console.log("ERROR");
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