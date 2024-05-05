import axios from 'axios';
import EventType from '../models/EventType';
import {EventModel }from '../../../backend/src/models/Event';
import Registration from '../../../backend/src/models/Registration';
// import { navigate } from 'react-router-dom';
import User from '../../../backend/src/models/User';

class BackendApi {
    constructor() {

    }
/* Event types */
    async getAllEventTypes(): Promise<EventType[]> {
      try {
        const response = await axios.get<typeof EventType[]>( "http://localhost:8080/eventTypes");
        return response.data.eventtypes;
      } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
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

    async getEventById(eventId: string): Promise<EventModel> {
      try {
          const response = await axios.get<EventModel>(`http://localhost:8080/events/${eventId}`);
          return response.data;
      } catch (error) {
          console.error("Erreur lors de la récupération de l'événement : ", error);
          throw error;
      }
    }

    async updateEvent(eventId: string, eventData: Partial<EventModel>): Promise<EventModel> {
      try {
          const response = await axios.put<EventModel>(`http://localhost:8080/events/${eventId}`,eventData,
              { validateStatus: status => status === 200 } 
          );
          return response.data;
      } catch (error) {
          console.error("Erreur lors de la mise à jour de l'événement : ", error);
          throw error;
      }
    }

    /* Registrations */

    async createRegistration(form:Partial<Registration | null>): Promise<Registration> {
      try {
        const response = await axios.post(
          "http://localhost:8080/registrations",
          form, // Passer les données de l'événement directement au backend
          { validateStatus: status => status === 201 } // Valider uniquement les réponses avec le code 201 (Created)
        );
        return response.data;
      } catch (error) {
        console.error("Erreur lors de l'inscription : ", error);
      }
      }

    
 
    async createEvent(eventData) {
      try {
        console.log("Création évenement : ",eventData);
        const response = await axios.post('http://localhost:8080/events', { ...eventData, isActive: true });
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la création de l\'événement :', error);
        throw error;
      }
    }  

    async createCategory(categoryData: { name: string }) {
      try {
        const response = await axios.post('http://localhost:8080/category', categoryData);
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la création de la catégorie :', error);
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

    
    
    async getAllCategories(): Promise<EventType[]> {
      try {
        const response = await axios.get('http://localhost:8080/category');
        return response.data.categories;
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories: ', error);
        throw error;
      }
    } 

    /* users */
    async getUser(id:string): Promise<User> {
      try {
        const response = await axios.get<typeof EventType[]>( `http://localhost:8080/users/${id}`);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
        throw error;
      }
    }
}

export default BackendApi