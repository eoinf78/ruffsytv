export class RuffVideo {
    public id: String;
    public title: string;
    public description: string;
    public projectname: string;
    public duration: number;
    public tags: string[];
    public incidents: Incident[];

    constructor(  ) {}
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