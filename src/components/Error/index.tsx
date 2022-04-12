import { toast } from "react-toastify";
import { Box } from "../Box";

type ErrorProps = {
  message?: string;
};

export const Error = (props: ErrorProps) => {
  if (props.message) toast.error("Fehler: " + props.message);
  return (
    <Box>
      <b>Fehler</b>
      {props.message && ": " + props.message}
    </Box>
  );
};
