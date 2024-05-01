import axios from 'axios';
import EventType from '../models/EventType';


class BackendApi {
    constructor() {

    }

    async getAllEventTypes(): Promise<EventType[]> {
      try {
        const response = await axios.get<any>( "http://localhost:8080/eventTypes");
        console.log(response)
        return response.data.eventtypes;
      } catch (error) {
        console.error("erreur lors de la récupération des données : ", error);
        throw error;
      }
    }
    
}

export default BackendApi