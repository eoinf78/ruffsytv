export class VideoSession {
    public id: number;
    public title: string;
    public status: string;
    public startedAt: number;
    public createdAt: string;
    public insights: SessionIncident[];

    constructor() {
        this.title = "New Session";
        this.startedAt = new Date().getTime();
    }
}

export class SessionIncident {
    public id: number;
    public time: number;
    public content: string;
    public author: string;
    public createdAt: number;

    constructor() {
        this.time = 0;
        this.content = "Insight";
        this.author = "user";
        this.createdAt = new Date().getTime();
    }
}