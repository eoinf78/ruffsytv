import {Routes, RouterModule} from "@angular/router";

import { VideoPlayerComponent } from "./video-player/components/video-player.component";
import {AboutComponent} from "./about/components/about.component";
import {ModuleWithProviders} from "@angular/core";

const appRoutes: Routes = [
    {path: '', redirectTo: 'vidplayer', pathMatch: 'full'},
    {path: 'vidplayer', component: VideoPlayerComponent, data: {title: 'Video Player'}},
    {path: 'about', component: AboutComponent, data: {title: 'About'}}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
