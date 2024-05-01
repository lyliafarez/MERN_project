export default class EventType {
    id: string;
    label: string;
    description: string;

    constructor(id: string, label: string, description: string){
        this.id = id;
        this.label = label;
        this.description = description;
    }
}