import NumberFormInt from "./NumberFormInt";

interface Props {
  value: number;
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
  title: string;
  arg: string;
}

function InputNumberInt(props: Props) {
  return (
    <NumberFormInt
      title={props.title}
      value={props.value}
      onChange={(value) => {
        props.setValue(props.arg, value);
      }}
    ></NumberFormInt>
  );
}

export default InputNumberInt;
