import { observer } from "mobx-react";
import { SelectedItem } from "./SelectedItem";

export const ListSelected = observer(({ items, func }) => {
  return (
    <>
      {Object.keys(items).map((item, index) => {
        return (
          <SelectedItem
            key={index}
            itemName={item}
            itemValue={items[item][0]}
            func={func}
          />
        );
      })}
    </>
  );
});
