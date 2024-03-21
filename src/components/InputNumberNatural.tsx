import NumberFormNatural from "./NumberFormNatural";

interface Props {
  value: number;
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
  title: string;
  arg: string;
}

function InputNumberNatural(props: Props) {
  return (
    <NumberFormNatural
      title={props.title}
      value={props.value}
      onChange={(value) => {
        props.setValue(props.arg, value);
      }}
    ></NumberFormNatural>
  );
}

export default InputNumberNatural;
