import HorizontalGroup from "./components/HorizontalGroup";
import VerticalGroup from "./components/VerticalGroup";
import TextForm from "./components/TextForm";
import DropdownForm from "./components/DropdownForm";
import { textSprites, textKeywords } from "./CardData";

interface Props {
  value: string;
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
  addTextSprite: (item: string) => void;
  addTextKeyword: (item: string) => void;
}

function CardText(props: Props) {
  return (
    <VerticalGroup
      items={[
        <HorizontalGroup
          items={[
            <TextForm
              title="Text"
              maxLength={999}
              value={props.value}
              setValue={props.setValue}
              arg="text"
              rows={4}
            ></TextForm>,
          ]}
        ></HorizontalGroup>,
        <HorizontalGroup
          items={[
            <DropdownForm
              items={["Icon"].concat(textSprites)}
              onChange={props.addTextSprite}
            ></DropdownForm>,
            <DropdownForm
              items={["Keyword"].concat(textKeywords)}
              onChange={props.addTextKeyword}
            ></DropdownForm>,
          ]}
        ></HorizontalGroup>,
      ]}
    ></VerticalGroup>
  );
}

export default CardText;
