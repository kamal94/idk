// https://material-ui.com/components/snackbars/
import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export { Alert };
