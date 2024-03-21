import Form from "react-bootstrap/Form";

interface Props {
  value: string;
  onChange: (item: string) => void;
  title: string;
  items: string[];
}

function SelectForm(props: Props) {
  return (
    <>
      <Form.Label style={{ color: "white" }}>{props.title}</Form.Label>
      <Form.Control
        as="select"
        value={props.value}
        onChange={(e) => {
          props.onChange(e.currentTarget.value);
        }}
      >
        {props.items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Form.Control>
    </>
  );
}

export default SelectForm;
