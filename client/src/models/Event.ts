export default class Event {
    id: string;
    title: string;
    description: string;
    date:string;
    address: string;
    pictures: Array<string>;
    links: Array<string>;
    places : number;
    isActive: boolean;
    ownerId:string;
    categoryId: object;

    constructor(id: string, title: string, description: string, date:string,address:string,pictures:Array<string>,links:Array<string>,places:number,isActive:boolean,categoryId:object,ownerId:string){
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.address = address;
        this.pictures = pictures;
        this.links = links;
        this.places = places;
        this.isActive = isActive;
        this.ownerId = ownerId;
        this.categoryId = categoryId;


    }
}