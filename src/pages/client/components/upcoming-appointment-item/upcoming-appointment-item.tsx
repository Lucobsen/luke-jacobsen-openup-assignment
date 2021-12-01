import React, { Component } from "react";
import { Psychologist, TimeSlot } from "../../../../app.models";
import { AppService } from "../../../../services/app.service";
import "./upcoming-appointment-item.css";

/**
 * Upcoming Appointment Component Props.
 */
interface UpcomingAppointmentProps {
  slots: TimeSlot[];
  clientId?: number | undefined;
}

/**
 * Upcoming Appointment Component State.
 */
interface UpcomingAppointmentState {
  slots: JSX.Element[];
}

/**
 * Upcoming Appointment Item Component.
 */
export class UpcomingAppointmentItem extends Component<
  UpcomingAppointmentProps,
  UpcomingAppointmentState
> {
  constructor(props: UpcomingAppointmentProps) {
    super(props);

    this.state = {
      slots: [],
    };
  }

  /**
   * Creates the appointment slot items.
   */
  public async componentDidMount(): Promise<void> {
    let validSlots: JSX.Element[] = [];

    for (let slot of this.props.slots) {
      if (slot.clientId === this.props.clientId) {
        const date = new Date(slot.startDateTime);

        const day = date.toLocaleDateString("en-GB", {
          month: "long",
          day: "numeric",
        });

        const startTime = new Date(slot.startDateTime).toLocaleTimeString(
          "en-GB",
          { hour: "2-digit", minute: "2-digit" }
        );

        const endTime = new Date(slot.endDateTime).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const psychologistName: string =
          await this.getAppointmentPsychologistName(slot.psychologistId);

        validSlots.push(
          <h4 className="appointment-heading">
            - {day} at {startTime}-{endTime} with psychologist:{" "}
            {psychologistName}
          </h4>
        );
      }
    }

    this.setState({
      slots: validSlots,
    });
  }

  /**
   * Gets the name of the psychologist who will be leading the appointment.
   * @param psychologistId - the psychologist's ID
   * @returns the psychologist's name
   */
  private async getAppointmentPsychologistName(
    psychologistId: number
  ): Promise<string> {
    const psychologist: Psychologist = await AppService.getPsychologistData(
      psychologistId
    );

    return psychologist.name;
  }

  /**
   * Renders the Upcoming Appointmnt Component.
   */
  public render(): JSX.Element {
    return (
      <form>
        <fieldset>
          <legend className="container-legend">Upcomming appointments</legend>

          <ul className="upcoming-appointment-list">{this.state.slots}</ul>
        </fieldset>
      </form>
    );
  }
}
