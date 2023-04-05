import React from "react";
import "./Buttons.css";

interface Props {
  handleNext: () => void;
  handleBack: () => void;
  displayBack: boolean;
  nextDisplayName: string;
}
const Buttons = ({
  handleNext,
  handleBack,
  displayBack,
  nextDisplayName,
}: Props) => {
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
        {nextDisplayName}
      </button>
    </div>
  );
};

export default Buttons;
