import React from "react";
import "./Buttons.css";

interface Props {
  handleNext: () => void;
  handleBack: () => void;
  displayBack: boolean;
}
const Buttons = ({ handleNext, handleBack, displayBack }: Props) => {
  return (
    <div className="clientForm-buttons">
      <button
        className="clientForm-button clientForm-button-back"
        onClick={handleBack}
        disabled={!displayBack}
      >
        Back
      </button>
      <button
        className="clientForm-button clientForm-button-next"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Buttons;
