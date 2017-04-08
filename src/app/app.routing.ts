import { Routes, RouterModule } from "@angular/router";

import { VideoPlayerComponent } from "./video-player/components/video-player.component";
import { TestPlayerComponent } from "./video-player/components/test-player.component";
import { LoginComponent } from './login/components/login.component';
import { AboutComponent } from "./about/components/about.component";
import { ModuleWithProviders } from "@angular/core";

const appRoutes: Routes = [
    { path: 'vidplayer', component: VideoPlayerComponent, data: { title: 'Video Player' } },
    { path: 'testplayer', component: TestPlayerComponent, data: { title: 'Test Video Player' } },
    { path: 'login', component: LoginComponent, data: { title: 'Login' } },
    { path: 'about', component: AboutComponent, data: { title: 'About' } },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
