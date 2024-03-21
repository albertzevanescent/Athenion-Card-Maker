import Form from "react-bootstrap/Form";

interface Props {
  items: string[];
  onChange: (item: string) => void;
}

function DropdownSelectForm(props: Props) {
  return (
    <>
      <Form.Control
        as="select"
        value={props.items[0]}
        onChange={(e) => {
          props.onChange(e.currentTarget.value);
          e.currentTarget.value = props.items[0];
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

export default DropdownSelectForm;
