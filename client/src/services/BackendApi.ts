import axios from 'axios';
import EventType from '../models/EventType';
import {EventModel }from '../../../backend/src/models/Event';
import Registraion from '../../../backend/src/models/Registration';

class BackendApi {
    constructor() {

    }
/* Event types */
    async getAllEventTypes(): Promise<EventType[]> {
      try {
        const response = await axios.get<typeof EventType[]>( "http://localhost:8080/eventTypes");
        return response.data.eventtypes;
      } catch (error) {
        console.error("erreur lors de la récupération des données : ", error);
        throw error;
      }
    }

    async createEventType(eventData: Partial<EventType | null>): Promise<EventType> {
      try {
        const response = await axios.post<EventType>(
          "http://localhost:8080/eventTypes",
          eventData, // Passer les données de l'événement directement au backend
          { validateStatus: status => status === 201 } // Valider uniquement les réponses avec le code 201 (Created)
        );
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la création de l'événement : ", error);
        throw error;
      }
    }

    //fonction delete
    async deleteEventTypeById(eventId: string): Promise<void> {
      console.log(eventId)
      try {
        await axios.delete(
          `http://localhost:8080/eventTypes/${eventId}`,
          { validateStatus: status => status === 204 }
        );
      } catch (error) {
        console.error("Erreur lors de la suppression de l'événement : ", error);
        throw error;
      }
    }
    
    /* Events */
    async getAllEvents(): Promise<typeof EventModel[]> {
      try {
        const response = await axios.get( "http://localhost:8080/events");
        return response.data.events;
      } catch (error) {
        console.error("erreur lors de la récupération des données : ", error);
        throw error;
      }
    }

    /* Registrations */

    async createRegistration(form:Partial<Registraion | null>): Promise<Registraion> {
      try {
        const response = await axios.post(
          "http://localhost:8080/registrations",
          form, // Passer les données de l'événement directement au backend
          { validateStatus: status => status === 201 } // Valider uniquement les réponses avec le code 201 (Created)
        );
        return response.data;
      } catch (error) {
        console.error("Erreur lors de l'inscription : ", error);
        throw error;
      }
    }

    async cancelRegistration(userId: string, eventId: string): Promise<void> {
      try {
          await axios.delete(
              `http://localhost:8080/registrations/${userId}/cancel/${eventId}`
          );
      } catch (error) {
          console.error("Erreur lors de l'inscription : ", error);
      }
  }

    
    
}

export default BackendApi