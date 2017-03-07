import { Component, Inject, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { RuffVideo, Incident, IncidentCatg } from '../../models/ruffvideo';

import _ from "lodash";

@Component({
    selector: 'vidplayer',
    templateUrl: './app/video-player/components/video-player.html'
})
export class VideoPlayerComponent implements OnInit {
    id = 'L7ivJTup2mc'; // GJ4KPrrbOU4'; // live video
    // id = 'KDov1ppPLCE';
    private player;
    private ytEvent;
    private timeArray: number[] = [];

    playerstate: number;
    isVideoMuted: boolean = false;
    video_volume: number = 10;
    teststring: string = "String";
    ruffvideo: RuffVideo = new RuffVideo();
    catg = IncidentCatg;

    current: number = 0;
    totalTime: number = 0;

    //Timeline
    timeline_slots: any[] = []   ;

    @Output() statusChanged:any = new EventEmitter<any>();

    constructor() {
        //this.ruffvideo.title = "New Video";
        this.ruffvideo.description = "";
        this.ruffvideo.projectname = "New Project";
        this.ruffvideo.incidents = [];
        this.ruffvideo.tags = [];

        this.setTimeInterval();
    }

    ngOnInit() {
        console.log('setTimeInterval');
        //this.setTimeInterval();
    }

    moveSlider(event) {
        console.log(event);
        this.gotoTime(event);
    }
    changeVolume(event) {
        this.player.setVolume(event);
        this.video_volume = event;
    }
    onPlayerError(event) {
        console.log("*** error ***");
        console.log(event);
    }

    onStateChange(event) {
        this.playerstate = this.player.getPlayerState();
        this.ytEvent = event.target.getCurrentTime();
        console.log('this.playerstate: ' + this.playerstate);
    }
    savePlayer(player) {
        this.player = player;
        this.player.playVideo();
        this.player.hideVideoInfo();
        this.playerstate = this.player.getPlayerState();
        this.isVideoMuted = this.player.isMuted();
        this.video_volume = this.player.getVolume();
        this.totalTime = this.player.getDuration();
        this.ruffvideo.title = this.player.getVideoData().title;
        //Temporary, only on video viewer after
        this.generateVideoTimeline();
        this.setTimeInterval();
    }
    playVideo() {
        this.player.playVideo();
    }
    pauseVideo() {
        this.player.pauseVideo();
    }
    toggleMute(val) {
        if (val === 'mute') {
            this.player.mute();
            this.isVideoMuted = true;
            this.video_volume = 0;
        } else {
            this.player.unMute();
            this.isVideoMuted = false;
            this.video_volume = this.player.getVolume();
        }
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
                if (incident.time > slot.value && incident.time <= end) {
                    slot.hasIncident = true;
                }
            });
        });
    }
    setInsightPositions(val) {
        let total = this.totalTime;
        let percentage = (val / total) * 100;
        return Math.floor(percentage);
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

    getCatgClass(catg) {
        return parseInt(catg, 10) === IncidentCatg.Bug;
    }

    setTimeInterval() {
        let vm = this;
        setInterval(function () {
            if (!vm.player) { return ; }

            vm.current = Math.round(vm.player.getCurrentTime());
        }, 100);
    }
}
