export class RuffVideo {
    public title: string;
    public description: string;
    public projectname: string;
    public duration: number;
    public tags: string[];
    public incidents: Incident[];

    constructor(  ) {}

    // constructor(vidDetails){
    //     this.title = vidDetails.title;
    //     this.description = vidDetails.description;
    //     this.projectname = vidDetails.projectname;
    //     this.tags = vidDetails.tags;
    //     this.incidents = vidDetails.incidents;
    // }
}

export class Incident {
    public time: number;
    public category: IncidentCatg;
    public description: string;
}

export enum IncidentCatg {
    General,
    Bug
}