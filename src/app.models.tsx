export type TimeSlot = {
  id: number;
  psychologistId: number;
  clientId: string | number;
  startDateTime: string;
  endDateTime: string;
};

export type Psychologist = {
  id: number;
  name: string;
};
