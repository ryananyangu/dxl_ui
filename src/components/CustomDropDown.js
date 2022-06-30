import { Form } from "react-bootstrap";

const CustomDropdown = ({ items, func }) => {
  return (
    <Form.Select
      onChange={(e) => {
        func(e.target.value);
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
