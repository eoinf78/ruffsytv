import { TestService } from './../services/test-service';
import { Component, Inject, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { RuffVideo, IncidentCatg } from '../../models/ruffvideo';
import { VideoSession, SessionIncident } from '../../models/session';
import { RuffUser } from '../../models/user';

import _ from "lodash";

@Component({
    selector: 'testplayer',
    templateUrl: './app/video-player/components/test-player.component.html'
})
export class TestPlayerComponent implements OnInit {

    private newVideoId = 'M7lc1UVf-VE';
    //private id = 'pCZeVTMEsik'; // (Live);
    //private id = '7XzdZ4KcI8Y'; //Rocket Jump
    //private id = '031Dshcnso4'; // Flower power

    //private id = 'ZfN_UIm0Ma0'; // Live Test
    //private id = 'P_W7suE39lc' // Rowley Shoals

    //private id = 'L7ivJTup2mc'; // GJ4KPrrbOU4'; // live video
    //private id = 'KDov1ppPLCE';

    public selectedUser: RuffUser;

    userList: RuffUser[] = [];

    private videos = [];
    private videoSessions: VideoSession[] = [];

    private player;
    private ytEvent;
    private timeArray: number[] = [];

    playerstate: number;
    isVideoMuted: boolean = false;
    video_volume: number;
    teststring: string = "String";
    // ruffVideo: RuffVideo = this.newVideo();
    catg = IncidentCatg;

    current: number = 0;
    totalTime: number = 0;

    //Timeline
    timeline_slots: any[] = [];

    // Session
    newSessionTitle: string = null;
    newSession: boolean = false;
    currentSession: VideoSession = null; // new VideoSession();
    sessionSelected: boolean = false;

    @Output() statusChanged: any = new EventEmitter<any>();

    constructor( private testService: TestService ) {
        testService.getAllSessions().subscribe(sessions => {
            this.videoSessions = sessions;
            this.currentSession = sessions[0];
        });
    }

    createNewSession() {
        this.currentSession = new VideoSession();
        this.newSession = true;
    }

    selectExistingSession() {
        this.currentSession = this.videoSessions[0];
        this.newSession = false;
    }

    newVideo(): RuffVideo {
        let video = new RuffVideo();
        video.description = "";
        video.projectname = "New Project";
        video.incidents = [];
        video.tags = [];
        this.setTimeInterval();
        return video;
    }

    ngOnInit() {
        let issy = new RuffUser();
        let elwood = new RuffUser();
        let eoin = new RuffUser();
        eoin.Id = 0;
        eoin.Name = "Eoin";
        issy.Id = 1;
        issy.Name = "Issy";
        elwood.Id = 2;
        elwood.Name = "Elwood";
        this.userList.push(eoin);
        this.userList.push(elwood);
        this.userList.push(issy);
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
        this.savePlayer(this.player, false);
    }

    savePlayer(player, initial: boolean = true) {
        this.player = player;
        player.hideVideoInfo();
        player.setOption("captions", "track", { "languageCode": "es" });
        if (initial) {
            this.playVideo();
        }
        this.player.hideVideoInfo();
        this.playerstate = this.player.getPlayerState();
        this.isVideoMuted = this.player.isMuted();
        this.video_volume = this.player.getVolume();
        this.totalTime = this.player.getDuration();
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
        let time = 0 || Math.floor(this.player.getCurrentTime());
        let newIncident: SessionIncident = new SessionIncident();
        newIncident.time = time;
        newIncident.content = "Insight";
        newIncident.author = this.selectedUser.Name;
        this.currentSession.insights.push(newIncident);

        this.testService.saveInsight(this.currentSession.id, newIncident).subscribe(res => {
            console.log(res);
        });
    }

    stopSession() {
        console.log("Stop Session: " + this.currentSession.id);
        this.testService.stopSession(this.currentSession.id).subscribe(res => {
            this.sessionSelected = false;
            this.pauseVideo();
            this.currentSession = null;
        });
    }

    refreshVideoSession() {
        this.testService.getSession(this.currentSession.id).subscribe(session => {
            this.currentSession = session;
        });
    }

    selectSession() {
        if (this.currentSession.id === undefined) {
            this.testService.createSession(this.currentSession).subscribe(res => {
                this.sessionSelected = true;
                this.currentSession = res;
            });
        } else {
            this.sessionSelected = true;
        }
    }

    setVideo(videoId: string) {
        videoId = videoId.replace("https://www.youtube.com/watch?v=", "");
        this.newVideoId = videoId;
        console.log(videoId);
        this.player.loadVideoById(videoId);
        var video = _.find(this.videos, { id: videoId });
    }

    setTimeInterval() {
        let vm = this;
        setInterval(function () {
            if (!vm.player) { return; }
            vm.current = Math.round(vm.player.getCurrentTime());
        }, 100);
    }
}
