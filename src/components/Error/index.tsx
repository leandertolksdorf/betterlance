import { Box } from "../Box";

type ErrorProps = {
  message?: string;
};

export const Error = (props: ErrorProps) => {
  return (
    <Box>
      <b>Fehler</b>
      {props.message && ": " + props.message}
    </Box>
  );
};
