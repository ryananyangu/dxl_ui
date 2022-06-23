import { Form } from "react-bootstrap";

const CustomDropdown = (props) => {
  return (
    <Form.Select
      onChange={(e) => {
        props.func(e.target.value);
      }}
    >
      {props.items.map((item, index) => {
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
