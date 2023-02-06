import React from "react";

export default function MeuralPromptDisplay(props) {
  const getClassnames = (status) => {
    return (
      "m-1 position-relative d-flex flex-column justify-content-center" +
      ("0" === status ? " d-none" : " pb-2")
    );
  };

  return (
    <div className={getClassnames(props.device?.status)}>
      <div className={"ms-3 meural-source-button-label fw-bold"}>
        Active Prompt
      </div>
      <div
        className={"MuiToggleButtonGroup-root p-3 meural-source-button-label"}
      >
        {props.device?.temperature}
      </div>
    </div>
  );
}
