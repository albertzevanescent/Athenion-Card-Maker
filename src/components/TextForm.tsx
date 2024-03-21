import Form from "react-bootstrap/Form";

interface Props {
  value: string;
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
  title: string;
  maxLength: number;
  arg: string;
  rows: number;
}

function TextForm(props: Props) {
  return (
    <>
      <Form.Label style={{ color: "white" }}>{props.title}</Form.Label>
      <Form.Control
        type="text"
        maxLength={props.maxLength}
        value={props.value}
        onChange={(e) => props.setValue(props.arg, e.currentTarget.value)}
        as="textarea"
        rows={props.rows}
      />
    </>
  );
}

export default TextForm;
