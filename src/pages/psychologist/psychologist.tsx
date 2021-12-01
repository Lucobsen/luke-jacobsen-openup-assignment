import React, { Component } from "react";

export class PsychologistPage extends Component {
  /**
   * Renders the Home Component.
   */
  public render(): JSX.Element {
    return (
      <div className="psychologist-page">
        <h3 className="psychologist-greeting">Hi Jason Yellow.</h3>

        <form>
          <fieldset>
            <legend className="container-legend">Add Availability</legend>

            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Basic example"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> */}
          </fieldset>
        </form>
      </div>
    );
  }
}
