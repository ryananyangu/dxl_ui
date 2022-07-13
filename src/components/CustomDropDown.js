import { Form } from "react-bootstrap";

const CustomDropdown = ({ items, func }) => {
  return (
    <Form.Select
      onChange={(e) => {
        func(parseInt(e.currentTarget.value));
      }}
    >
      {items.map((item, index) => {
        return (
          <option value={index} key={index}>
            {item}
          </option>
        );
      })}
    </Form.Select>
  );
};

export default CustomDropdown;
