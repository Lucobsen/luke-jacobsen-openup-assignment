import React, { Component } from "react";
import { Client, TimeSlot } from "../../app.models";
import { AppService } from "../../services/app.service";
import "./client.css";
import { TimeSlotItem } from "./components/time-slot-item/time-slot-item";
import { UpcomingAppointmentItem } from "./components/upcoming-appointment-item/upcoming-appointment-item";

/**
 * Client Page Props.
 */
interface ClientProps {
  id: string;
}

/**
 * Client Page State.
 */
interface ClientState {
  client?: Client;
  timeSlots: TimeSlot[];
}

/**
 * The Client Page Component.
 */
export class ClientPage extends Component<ClientProps, ClientState> {
  constructor(props: ClientProps) {
    super(props);

    this.state = {
      timeSlots: [],
    };
  }

  /**
   * Gets the data related to the component once it mounts.
   */
  public async componentDidMount(): Promise<void> {
    const client: Client = await AppService.getClientData(this.props.id);
    const timeSlots: TimeSlot[] = await this.getAvailableTimeslots();

    this.setState({ client, timeSlots });
  }

  /**
   * Filters out booked timeslots from the full list of times.
   * @param timeSlots - the full list of timeslots available on the site
   * @returns a valid list of timeslots that are not booked
   */
  private async getAvailableTimeslots(): Promise<TimeSlot[]> {
    const timeSlots: TimeSlot[] = await AppService.getTimeslots();
    const availableSlots: TimeSlot[] = [];

    for (let slot of timeSlots) {
      if (slot.clientId !== "") {
        availableSlots.push(slot);
      }
    }

    return availableSlots;
  }
  /**
   * Creates the TimeSlotItem elements.
   */
  private createTimeSlotItems(): JSX.Element[] {
    const timeslots = [];

    for (let slot of this.state.timeSlots) {
      timeslots.push(<TimeSlotItem slot={slot} />);
    }

    return timeslots;
  }

  /**
   * Renders the Client Component.
   */
  public render(): JSX.Element {
    const timeslots: JSX.Element[] = this.createTimeSlotItems();

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
