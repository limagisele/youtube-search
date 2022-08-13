import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import StoreContext from "../contexts/store";

const Alerts = () => {
  const {
    store: { alert, alertContent },
    dispatch
  } = useContext(StoreContext);

  const handleClose = () => {
    dispatch({
      type: "setAlert",
      data: false,
    });
  };

  return (
    <>
      {alert && (
        <Stack sx={{ width: "60%", margin: "auto" }}>
          <Alert severity="error" onClose={handleClose}>
            {alertContent}
          </Alert>
        </Stack>
      )}
    </>
  );
}

export default Alerts;