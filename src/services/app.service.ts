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
    const response: AxiosResponse<Client> = await axios.get(
      `${baseUrl}/clients/${clientId}`
    );

    return response.data;
  }

  /**
   * Gets the data for a specific psychologist.
   * @param psychologistId - the psychologist's ID
   * @returns the psychologist data related to the ID
   */
  public static async getPsychologistData(
    psychologistId: number
  ): Promise<Psychologist> {
    const response: AxiosResponse<Psychologist> = await axios.get(
      `${baseUrl}/psychologists/${psychologistId}`
    );

    return response.data;
  }

  /**
   * Gets the applications timeslots.
   * @returns a list of the app's timeslots
   */
  public static async getTimeslots(): Promise<TimeSlot[]> {
    const response: AxiosResponse<TimeSlot[]> = await axios.get(
      `${baseUrl}/timeslots`
    );

    return response.data;
  }
}
