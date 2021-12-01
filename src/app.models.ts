/**
 * The Timeslot data model.
 */
export interface TimeSlot {
  id: number;
  psychologistId: number;
  clientId: string | number;
  startDateTime: string;
  endDateTime: string;
}

/**
 * The Psychologist data model.
 */
export interface Psychologist {
  id: number;
  name: string;
}

/**
 * The client data model.
 */
export interface Client {
  id: number;
  name: string;
}
