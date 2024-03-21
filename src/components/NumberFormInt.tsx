import Form from "react-bootstrap/Form";

interface Props {
  title: string;
  value: number;
  onChange: (value: number) => void;
}

function NumberFormInt(props: Props) {
  return (
    <>
      <Form.Label style={{ color: "white" }}>{props.title}</Form.Label>
      <Form.Control
        type="number"
        step={5}
        value={props.value}
        onChange={(e) => {
          if (Number.isNaN(parseInt(e.currentTarget.value))) {
            props.onChange(0);
          } else {
            props.onChange(parseInt(e.currentTarget.value));
          }
        }}
      />
    </>
  );
}

export default NumberFormInt;
