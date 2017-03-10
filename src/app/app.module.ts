import { VideoService } from './video-player/services/video-service';
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { YoutubePlayerModule } from 'ng2-youtube-player';
import { KeysPipe, IncidentTimePipe, IncidentCatgPipe, OrderByPipe } from './pipes/incident-time.pipe';

import {AppComponent} from "./app.component";
import { VideoPlayerComponent } from "./video-player/components/video-player.component";

import {AboutComponent} from "./about/components/about.component";

import {routing, appRoutingProviders} from './app.routing';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        YoutubePlayerModule,
        routing
    ],
    declarations: [
        AppComponent,
        VideoPlayerComponent,
        AboutComponent,
        KeysPipe,
        IncidentTimePipe,
        IncidentCatgPipe,
        OrderByPipe,
    ],
    providers: [
        appRoutingProviders,
        VideoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

//platformBrowserDynamic().bootstrapModule(AppModule);