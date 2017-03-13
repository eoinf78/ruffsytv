import { VideoService } from './../services/video-service';
import { Component, Inject, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { RuffVideo, Incident, IncidentCatg } from '../../models/ruffvideo';

import _ from "lodash";

@Component({
    selector: 'vidplayer',
    templateUrl: './app/video-player/components/video-player.html'
})
export class VideoPlayerComponent implements OnInit {

    private id = 'M7lc1UVf-VE';
    //private id = 'pCZeVTMEsik'; // (Live);
    //private id = '7XzdZ4KcI8Y'; //Rocket Jump
    //private id = '031Dshcnso4'; // Flower power

    //private id = 'ZfN_UIm0Ma0'; // Live Test
    //private id = 'P_W7suE39lc' // Rowley Shoals

    //private id = 'L7ivJTup2mc'; // GJ4KPrrbOU4'; // live video
    //private id = 'KDov1ppPLCE';

    private videos = [];

    private player;
    private ytEvent;
    private timeArray: number[] = [];

    playerstate: number;
    isVideoMuted: boolean = false;
    video_volume: number = 10;
    teststring: string = "String";
    ruffVideo: RuffVideo = this.newVideo();
    catg = IncidentCatg;

    current: number = 0;
    totalTime: number = 0;

    //Timeline
    timeline_slots: any[] = [];

    @Output() statusChanged: any = new EventEmitter<any>();

    constructor(private videoService: VideoService) {
        videoService.getVideos().subscribe(videos => {
            this.videos = videos;

            if (videos.length > 0) {
                var video = videos[0];
                this.id = video.id;
                this.ruffVideo = video;
            }
        });
    }

    newVideo(): RuffVideo {
        let video = new RuffVideo();
        video.id = this.id;
        //video.title = "New Video";
        video.description = "";
        video.projectname = "New Project";
        video.incidents = [];
        video.tags = [];
        this.updateVideo(video);
        this.setTimeInterval();
        return video;
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
        this.savePlayer(this.player);
    }

    savePlayer(player) {
        this.player = player;
        player.hideVideoInfo();
        player.setOption("captions", "track", { "languageCode": "es" });
        // player.setOption('showinfo', 0);
        this.player.playVideo();
        this.player.hideVideoInfo();
        this.playerstate = this.player.getPlayerState();
        this.isVideoMuted = this.player.isMuted();
        this.video_volume = this.player.getVolume();
        this.totalTime = this.player.getDuration();
        this.ruffVideo.title = this.player.getVideoData().title;

        this.updateVideo(this.ruffVideo);

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
        let newIncident: Incident = new Incident();
        let sortedArray = this.ruffVideo.incidents;
        newIncident.time = time;
        newIncident.description = "new incident";
        newIncident.category = IncidentCatg.General;

        this.ruffVideo.incidents.push(newIncident);
        this.refreshVideoTimeline();

        this.updateVideo(this.ruffVideo);
        //this.timeArray.push(Math.floor(this.player.getCurrentTime()));
    }

    updateVideo(video: RuffVideo) {
        if (!video.title || !video.id) {
            return;
        }

        this.videoService.addOrUpdateVideo(video).subscribe(result => {
            this.videos = result;
        }, error => console.log('Could not load videos'));
    }

    deleteIncident(item) {
        let idx = this.ruffVideo.incidents.indexOf(item);
        this.ruffVideo.incidents.splice(idx, 1);

        this.updateVideo(this.ruffVideo);
    }

    getVideoInfo() {
        console.log(this.ruffVideo);
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
            this.ruffVideo.incidents.forEach(incident => {
                if (incident.time >= slot.value && incident.time <= end) {
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
            this.ruffVideo.incidents.forEach(element => {
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

    setVideo(videoId: string) {
        videoId = videoId.replace("https://www.youtube.com/watch?v=", "");
        this.id = videoId;
        console.log(videoId);
        this.player.loadVideoById(videoId);

        var video = _.find(this.videos, { id: videoId });
        
        // copy into ruffVideo
        this.ruffVideo = { ...video} as RuffVideo;
        if (!this.ruffVideo) {
            this.ruffVideo = this.newVideo();
        }
    }

    setTimeInterval() {
        let vm = this;
        setInterval(function () {
            if (!vm.player) { return; }

            vm.current = Math.round(vm.player.getCurrentTime());
        }, 100);
    }
}
