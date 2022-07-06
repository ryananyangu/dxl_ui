import { Alert } from "react-bootstrap";

export const CustomAlert = ({ variant, body, onClose }) => {
  return (
    <Alert transition={true} variant={variant} onClose={onClose} dismissible>
      {body}
    </Alert>
  );
};
