import HorizontalGroup from "./components/HorizontalGroup";
import TextForm from "./components/TextForm";

interface Props {
  value: string;
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
}

function CardName(props: Props) {
  return (
    <HorizontalGroup
      items={[
        <TextForm
          title="Name"
          maxLength={25}
          value={props.value}
          setValue={props.setValue}
          arg="name"
          rows={1}
        ></TextForm>,
      ]}
    ></HorizontalGroup>
  );
}

export default CardName;
