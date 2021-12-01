import axios, { AxiosResponse } from "axios";
import { Client, Psychologist, TimeSlot } from "../app.models";

const baseUrl: string = "http://localhost:5000";

/**
 * The wrapper class for the applications service calls.
 */
export class AppService {
  /**
   * Gets the data for a specific client.
   * @param clientId - the client's ID
   * @returns the client data related to the ID
   */
  public static async getClientData(clientId: string): Promise<Client> {
    try {
      const response: AxiosResponse<Client> = await axios.get(
        `${baseUrl}/clients/${clientId}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch client data: " + error);
    }
  }

  /**
   * Gets the data for a specific psychologist.
   * @param psychologistId - the psychologist's ID
   * @returns the psychologist data related to the ID
   */
  public static async getPsychologistData(
    psychologistId: number
  ): Promise<Psychologist> {
    try {
      const response: AxiosResponse<Psychologist> = await axios.get(
        `${baseUrl}/psychologists/${psychologistId}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch psychologist data: " + error);
    }
  }

  /**
   * Gets the applications timeslots.
   * @returns a list of the app's timeslots
   */
  public static async getTimeslots(): Promise<TimeSlot[]> {
    try {
      const response: AxiosResponse<TimeSlot[]> = await axios.get(
        `${baseUrl}/timeslots`
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch timeslots: " + error);
    }
  }

  /**
   * Updates a timeslot.
   * @returns an updated timeslot
   */
  public static async updateTimeslot(
    timeslotId: number,
    updateModel: Partial<TimeSlot>
  ): Promise<TimeSlot> {
    try {
      const response: AxiosResponse<TimeSlot> = await axios.patch(
        `${baseUrl}/timeslots/${timeslotId}`,
        updateModel
      );

      return response.data;
    } catch (error) {
      throw new Error("Failed to update timeslot: " + error);
    }
  }
}
