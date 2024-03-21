import HorizontalGroup from "./components/HorizontalGroup";
import ButtonComponent from "./components/ButtonComponent";
import InputToggle from "./components/InputToggle";
import Canvas from "./Canvas";
import { RefObject, useRef } from "react";

interface Props {
  value: boolean;
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
  downloadCard: () => void;
  exportData: () => void;
  importData: (file: File) => void;
}

let hiddenImport: RefObject<HTMLInputElement>;

const handleClick = () => {
  if (hiddenImport == null || hiddenImport.current == null) {
    return;
  }
  hiddenImport.current.click();
};

function CardCanvas(props: Props) {
  hiddenImport = useRef(null);
  return (
    <>
      <Canvas></Canvas>
      <HorizontalGroup
        items={[
          <InputToggle
            value={props.value}
            setValue={props.setValue}
            title=""
            item={"HideUI"}
            arg="hideUI"
          ></InputToggle>,
          <ButtonComponent
            title="Export Data"
            onClick={props.exportData}
          ></ButtonComponent>,
        ]}
      ></HorizontalGroup>
      <HorizontalGroup
        items={[
          <ButtonComponent
            title="Download"
            onClick={props.downloadCard}
          ></ButtonComponent>,
          <ButtonComponent
            title="Import Data"
            onClick={handleClick}
          ></ButtonComponent>,
        ]}
      ></HorizontalGroup>
      <input
        type="file"
        accept=".json"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          if (target.files == null) {
            return;
          }
          props.importData(target.files[0]);
        }}
        ref={hiddenImport}
        style={{ display: "none" }}
      />
    </>
  );
}

export default CardCanvas;
