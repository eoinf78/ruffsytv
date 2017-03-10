import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoPlayIcon } from './components/video-play.icon';

@NgModule({
    imports: [ CommonModule ],
    exports: [
        CommonModule,
        VideoPlayIcon,
    ],
    declarations: [
        VideoPlayIcon,
    ],
})
export class VideoIconsModule {
}