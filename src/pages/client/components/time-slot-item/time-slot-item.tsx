import axios from "axios";
import React, { Component } from "react";
import { Psychologist, TimeSlot } from "../../../../app.models";
import "./time-slot-item.css";

type TimeSlotItemProps = {
  slot: TimeSlot;
};

type TimeSlotItemState = {
  psychologist: Psychologist;
};

/**
 *
 */
export class TimeSlotItem extends Component<
  TimeSlotItemProps,
  TimeSlotItemState
> {
  constructor(props: TimeSlotItemProps) {
    super(props);

    this.state = {
      psychologist: {
        id: 0,
        name: "Henk Snell",
      },
    };
  }

  /**
   *
   */
  public async componentDidMount() {
    try {
      const psychologist: Psychologist = await axios.get(
        `http://localhost:3000/psychologists/${this.props.slot.psychologistId}`
      );

      this.setState({ psychologist });
    } catch (error) {
      this.setState({
        psychologist: {
          id: 0,
          name: "Henk Snell",
        },
      });

      //throw new Error("Failed to fetch psychologist data!!!");
    }
  }

  /**
   * Renders the Time Slot Item Component.
   */
  public render(): JSX.Element {
    const date = new Date(this.props.slot.startDateTime);

    const day = date.toLocaleDateString("en-GB", {
      month: "long",
      day: "numeric",
    });

    const startTime = new Date(
      this.props.slot.startDateTime
    ).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    const endTime = new Date(this.props.slot.endDateTime).toLocaleTimeString(
      "en-GB",
      { hour: "2-digit", minute: "2-digit" }
    );

    return (
      <div className="time-slot-item-container">
        <h4 className="time-slot-item-name">
          - {day} - {startTime} - {endTime} - with{" "}
          {this.state.psychologist.name}
        </h4>

        <button className="time-slot-item-button">Book</button>
      </div>
    );
  }
}
