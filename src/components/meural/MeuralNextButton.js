import React from "react";
import { Button } from "react-bootstrap";
import { nextMeuralImage } from "../../actions";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MeuralNextButton(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
    nextMeuralImage();
  };

  const generateButtonText = (status) => {
    return "1" === status ? "Generate New Image" : "Next Image";
  };

  const generateAlertText = (status) => {
    return "1" === status
      ? "Started Generating New Image"
      : "Fetching Next Image";
  };

  const getIconStyle = (status) => {
    return "mdi mdi-image-" + ("1" === status ? "refresh-outline" : "move");
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant=""
        size="lg"
        className={"mb-3 m-1 position-relative d-flex justify-content-center"}
      >
        <i className={getIconStyle(props.device?.status)} />
        <div className="position-absolute bottom w-100 m-2 ps-2 pe-2">
          {generateButtonText(props.device?.status)}
        </div>
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          {generateAlertText(props.device?.status)}
        </Alert>
      </Snackbar>
    </div>
  );
}
