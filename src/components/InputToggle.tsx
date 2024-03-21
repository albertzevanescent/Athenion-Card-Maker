import CheckboxForm from "./CheckboxForm";

interface Props {
  value: boolean;
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
  title: string;
  item: string;
  arg: string;
}

function InputToggle(props: Props) {
  return (
    <CheckboxForm
      item={props.item}
      onChange={() => {
        props.setValue(props.arg, !props.value);
      }}
      checked={props.value}
    ></CheckboxForm>
  );
}

export default InputToggle;
