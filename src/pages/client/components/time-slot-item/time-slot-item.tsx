import React, { Component } from "react";
import { Psychologist, TimeSlot } from "../../../../app.models";
import { AppService } from "../../../../services/app.service";
import "./time-slot-item.css";

/**
 * TimeSlot Item props.
 */
interface TimeSlotItemProps {
  slot: TimeSlot;
}

/**
 * TimeSlot Item state.
 */
interface TimeSlotItemState {
  psychologist: Psychologist;
}

/**
 * TimeSlot Item Component.
 */
export class TimeSlotItem extends Component<
  TimeSlotItemProps,
  TimeSlotItemState
> {
  constructor(props: TimeSlotItemProps) {
    super(props);

    this.bookAppointment = this.bookAppointment.bind(this);
  }

  /**
   * Gets the data for the psychologist attached to the timeslot.
   */
  public async componentDidMount(): Promise<void> {
    const psychologist: Psychologist = await AppService.getPsychologistData(
      this.props.slot.psychologistId
    );

    this.setState({ psychologist });
  }

  /**
   * Gets the start of the timeslot in the format of an hourly string value.
   */
  private getStartTime(): string {
    const startTime: string = new Date(
      this.props.slot.startDateTime
    ).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    return startTime;
  }

  /**
   * Gets the end of the timeslot in the format of an hourly string value.
   */
  private getEndTime(): string {
    const endTime: string = new Date(
      this.props.slot.endDateTime
    ).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    return endTime;
  }

  /**
   * Books an appointment.
   */
  private async bookAppointment(): Promise<void> {
    const timeslotId: number = this.props.slot.id;
    const clientId: number = Number(this.props.slot.clientId);

    await AppService.updateTimeslot(timeslotId, { clientId });

    window.alert(`Appointment booked with ${this.state.psychologist.name}`);
  }

  /**
   * Renders the Time Slot Item Component.
   */
  public render(): JSX.Element {
    const date = new Date(this.props.slot.startDateTime);
    const day: string = date.toLocaleDateString("en-GB", {
      month: "long",
      day: "numeric",
    });

    const startTime: string = this.getStartTime();
    const endTime: string = this.getEndTime();

    return (
      <div className="time-slot-item-container">
        <h4 className="time-slot-item-name">
          - {day} - {startTime} - {endTime} - with{" "}
          {this.state?.psychologist.name}
        </h4>

        <button
          className="time-slot-item-button"
          onClick={this.bookAppointment}
        >
          Book
        </button>
      </div>
    );
  }
}
