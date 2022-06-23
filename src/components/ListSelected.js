import { SelectedItem } from "./SelectedItem";

export const ListSelected = (props) => {
  console.log(props.items);
  return (
    <>
      {/* {props.items.map((item, index) => {
        let itemName = Object.keys(item)[0];
        let itemValue = Object.values(item)[0];
        return (
          <SelectedItem key={index} itemName={itemName} itemValue={itemValue} />
        );
      })} */}
    </>
  );
};
