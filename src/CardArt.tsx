import HorizontalGroup from "./components/HorizontalGroup";
import VerticalGroup from "./components/VerticalGroup";
import FileForm from "./components/FileForm";
import InputSelect from "./components/InputSelect";
import InputNumberInt from "./components/InputNumberInt";
import { scales } from "./CardData";

interface Props {
  scaleValue: number;
  offsetXValue: number;
  offsetYValue: number;
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
}

function CardArt(props: Props) {
  return (
    <VerticalGroup
      items={[
        <FileForm
          setValue={props.setValue}
          title="Image (recommended 412x604)"
          arg="image"
        ></FileForm>,
        <HorizontalGroup
          items={[
            <InputSelect
              value={"" + props.scaleValue}
              setValue={props.setValue}
              title="Scale"
              items={scales}
              arg="scale"
            ></InputSelect>,
            <InputNumberInt
              title="X Offset"
              value={props.offsetXValue}
              setValue={props.setValue}
              arg="offsetX"
            ></InputNumberInt>,
            <InputNumberInt
              title="Y Offset"
              value={props.offsetYValue}
              setValue={props.setValue}
              arg="offsetY"
            ></InputNumberInt>,
          ]}
        ></HorizontalGroup>,
      ]}
    ></VerticalGroup>
  );
}

export default CardArt;
