import { SelectedItem } from "./SelectedItem";

export const ListSelected = ({ items, func }) => {
  return (
    <>
      {Object.keys(items).map((item, index) => {
        return (
          <SelectedItem
            key={index}
            itemName={item}
            itemValue={items[item]}
            func={func}
          />
        );
      })}
    </>
  );
};
