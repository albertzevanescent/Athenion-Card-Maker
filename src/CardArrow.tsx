import { ReactNode } from "react";
import { Form } from "react-bootstrap";
import HorizontalGroup from "./components/HorizontalGroup";
import CheckboxForm from "./components/CheckboxForm";
import { arrows } from "./CardData";

interface Props {
  value: string[];
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
}

function CardArrow(props: Props) {
  const children: ReactNode[] = [];
  arrows.map((arrow) =>
    children.push(
      <CheckboxForm
        item={arrow}
        onChange={(value) => {
          let newArrows = [...props.value];
          if (newArrows.indexOf(value) == -1) {
            newArrows.push(value);
          } else {
            newArrows.splice(newArrows.indexOf(value), 1);
          }
          props.setValue("arrows", newArrows);
        }}
        checked={props.value.indexOf(arrow) != -1}
      />
    )
  );
  return (
    <>
      <HorizontalGroup
        items={[<Form.Label style={{ color: "white" }}>{"Arrows"}</Form.Label>]}
      ></HorizontalGroup>

      <HorizontalGroup items={children}></HorizontalGroup>
    </>
  );
}

export default CardArrow;
