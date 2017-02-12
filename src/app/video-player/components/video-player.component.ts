import { Component, Inject, Input, Output, EventEmitter } from "@angular/core";
import { RuffVideo, Incident, IncidentCatg } from '../../models/ruffvideo';

import _ from "lodash";

@Component({
    selector: 'vidplayer',
    templateUrl: './app/video-player/components/video-player.html'
})
export class VideoPlayerComponent {
    id = 'KDov1ppPLCE'; //'rrkrvAUbU9Y';
    private player;
    private ytEvent;
    private timeArray: number[] = [];

    teststring: string = "String";
    ruffvideo: RuffVideo = new RuffVideo();
    catg = IncidentCatg;

    //Timeline
    timeline_slots: any[] = []   ;

    @Output() statusChanged:any = new EventEmitter<any>();

    constructor() {
        //this.ruffvideo.title = "New Video";
        this.ruffvideo.description = "";
        this.ruffvideo.projectname = "New Project";
        this.ruffvideo.incidents = [];
        this.ruffvideo.tags = [];
    }
    onStateChange(event) {
        this.ytEvent = event.target.getCurrentTime();
    }
    savePlayer(player) {
        console.log('getVideoData');
        console.log(player);
        console.log(player.getDuration());
        this.player = player;
        player.hideVideoInfo();
        player.setOption("captions", "track", {"languageCode": "es"});
        // player.setOption('showinfo', 0);
        this.ruffvideo.title = this.player.getVideoData().title;
        //Temporary, only on video viewer after
        this.generateVideoTimeline();
    }
    playVideo() {
        console.log(this.player);
        this.player.playVideo();
    }
    pauseVideo() {
        this.player.pauseVideo();
    }
    setTime() {
        let time = Math.floor(this.player.getCurrentTime());
        let newIncident: Incident = new Incident();
        let sortedArray = this.ruffvideo.incidents;
        newIncident.time = time;
        newIncident.description = "new incident";
        newIncident.category = IncidentCatg.General;

        this.ruffvideo.incidents.push(newIncident);
        this.refreshVideoTimeline();

        //this.timeArray.push(Math.floor(this.player.getCurrentTime()));
    }
    deleteIncident(item) {
        let idx = this.ruffvideo.incidents.indexOf(item);
        this.ruffvideo.incidents.splice(idx, 1);

    }
    getVideoInfo() {
        console.log(this.ruffvideo);
    }
    gotoTime(goto) {
        this.player.seekTo(goto);
    }
    refreshVideoTimeline() {
        let dur = this.player.getDuration();
        let numOfSlots = 40;
        let timeBlock = Math.floor(dur / numOfSlots);

        this.timeline_slots.forEach(slot => {
            var end = slot.value + timeBlock;
            this.ruffvideo.incidents.forEach(incident => {
                if (incident.time >= slot.value && incident.time <= end) {
                    slot.hasIncident = true;
                }
            });
        });
    }
    generateVideoTimeline() {
        let dur = this.player.getDuration();
        let numOfSlots = 40;
        let timeBlock = Math.floor(dur / numOfSlots);
        this.timeline_slots = [];
        console.log(timeBlock);
        for (var i = 0; i < numOfSlots; i++) {
            var start = timeBlock * i;
            var end = start + timeBlock;
            let hasIncident = false;
            this.ruffvideo.incidents.forEach(element => {
                if (element.time >= start && element.time <= end) {
                    hasIncident = true;
                }
            });

            this.timeline_slots.push({ 'value': start, 'hasIncident': hasIncident });
        }
    }
}
