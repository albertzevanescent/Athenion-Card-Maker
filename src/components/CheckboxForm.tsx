import Form from "react-bootstrap/Form";

interface Props {
  item: string;
  onChange: (item: string) => void;
  checked: boolean;
}

function CheckboxForm(props: Props) {
  return (
    <Form>
      {
        <div key="checkbox" className="mb-3">
          <Form.Check
            inline
            type="checkbox"
            key={props.item}
            label={props.item}
            onChange={() => props.onChange(props.item)}
            checked={props.checked}
            style={{
              color: "white",
            }}
          />
        </div>
      }
    </Form>
  );
}

export default CheckboxForm;
