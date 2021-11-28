import axios from "axios";
import React, { Component } from "react";
import { TimeSlot } from "../../app.models";
import "./client.css";
import { TimeSlotItem } from "./components/time-slot-item/time-slot-item";
import { UpcomingAppointmentItem } from "./components/upcoming-appointment-item/upcoming-appointment-item";

type Client = {
  id: number;
  name: string;
};

interface ClientProps {
  id: string;
}

interface ClientState {
  client?: Client;
  timeSlots: TimeSlot[];
}

export class ClientPage extends Component<ClientProps, ClientState> {
  constructor(props: ClientProps) {
    super(props);

    this.state = {
      timeSlots: [],
    };
  }

  /**
   *
   */
  public async componentDidMount() {
    try {
      const client: Client = await axios.get(
        `http://localhost:3000/clients/${this.props.id}`
      );

      const timeSlots: TimeSlot[] = await axios.get(
        `http://localhost:3000/timeslots`
      );

      this.setState({ client, timeSlots });
    } catch (error) {
      this.setState({
        client: {
          id: 1,
          name: "John Achterburg",
        },
        timeSlots: [
          {
            id: 0,
            psychologistId: 1,
            clientId: "",
            startDateTime: "2021-04-11T09:00:00.0000000Z",
            endDateTime: "2021-04-11T09:30:00.0000000Z",
          },
          {
            id: 1,
            psychologistId: 1,
            clientId: "",
            startDateTime: "2021-04-11T09:30:00.0000000Z",
            endDateTime: "2021-04-11T10:00:00.0000000Z",
          },
          {
            id: 2,
            psychologistId: 1,
            clientId: "",
            startDateTime: "2021-04-11T10:30:00.0000000Z",
            endDateTime: "2021-04-11T11:00:00.0000000Z",
          },
          {
            id: 3,
            psychologistId: 1,
            clientId: "",
            startDateTime: "2021-04-11T11:00:00.0000000Z",
            endDateTime: "2021-04-11T11:30:00.0000000Z",
          },
          {
            id: 4,
            psychologistId: 1,
            clientId: "",
            startDateTime: "2021-04-11T11:30:00.0000000Z",
            endDateTime: "2021-04-11T12:00:00.0000000Z",
          },
          {
            id: 5,
            psychologistId: 1,
            clientId: 0,
            startDateTime: "2021-04-11T12:00:00.0000000Z",
            endDateTime: "2021-04-11T12:30:00.0000000Z",
          },
          {
            id: 6,
            psychologistId: 1,
            clientId: 1,
            startDateTime: "2021-04-11T12:30:00.0000000Z",
            endDateTime: "2021-04-11T13:00:00.0000000Z",
          },
          {
            id: 7,
            psychologistId: 0,
            clientId: "",
            startDateTime: "2021-04-11T09:00:00.0000000Z",
            endDateTime: "2021-04-11T09:30:00.0000000Z",
          },
          {
            id: 8,
            psychologistId: 0,
            clientId: 0,
            startDateTime: "2021-04-11T09:00:00.0000000Z",
            endDateTime: "2021-04-11T09:30:00.0000000Z",
          },
        ],
      });

      //throw new Error("Failed to fetch client data!!!");
    }
  }

  /**
   * Renders the Home Component.
   */
  public render(): JSX.Element {
    const timeslots = [];

    for (let slot of this.state.timeSlots) {
      timeslots.push(<TimeSlotItem slot={slot} />);
    }

    return (
      <div className="client-page">
        <h3 className="client-greeting">
          Hi {this.state.client?.name}, welcome! Here you can book your next
          appointment.
        </h3>

        <form>
          <fieldset>
            <legend className="container-legend">Available time slots</legend>

            <ul className="time-slot-list">{timeslots}</ul>
          </fieldset>
        </form>

        <UpcomingAppointmentItem
          slots={this.state.timeSlots}
          clientId={this.state.client?.id}
        />
      </div>
    );
  }
}
