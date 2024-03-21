import SelectForm from "./SelectForm";

interface Props {
  value: string;
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
  title: string;
  items: string[];
  arg: string;
}

function InputSelect(props: Props) {
  return (
    <SelectForm
      value={props.value}
      onChange={(value) => props.setValue(props.arg, value)}
      items={props.items}
      title={props.title}
    ></SelectForm>
  );
}

export default InputSelect;
