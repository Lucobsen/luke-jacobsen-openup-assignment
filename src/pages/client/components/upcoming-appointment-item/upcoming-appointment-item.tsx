import React, { Component } from "react";
import { TimeSlot } from "../../../../app.models";
import "./upcoming-appointment-item.css";

type UpcomingAppointmentProps = {
  slots: TimeSlot[];
  clientId?: number | undefined;
};

/**
 *
 */
export class UpcomingAppointmentItem extends Component<UpcomingAppointmentProps> {
  constructor(props: UpcomingAppointmentProps) {
    super(props);
  }

  /**
   * Renders the Time Slot Item Component.
   */
  public render(): JSX.Element {
    let validSlots: JSX.Element[] = [];

    this.props.slots.map((slot) => {
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

        validSlots.push(
          <h4 className="appointment-heading">
            - {day} at {startTime}-{endTime} with psychologist: Bob
          </h4>
        );
      }
    });

    return (
      <form>
        <fieldset>
          <legend className="container-legend">Upcomming appointments</legend>

          <ul className="upcoming-appointment-list">{validSlots}</ul>
        </fieldset>
      </form>
    );
  }
}
