import Form from "react-bootstrap/Form";

interface Props {
  title: string;
  value: number;
  onChange: (value: number) => void;
}

function NumberFormNatural(props: Props) {
  return (
    <>
      <Form.Label style={{ color: "white" }}>{props.title}</Form.Label>
      <Form.Control
        type="text"
        min="0"
        maxLength={1}
        onKeyDown={(event) => {
          if (!/[0-9]|Backspace/.test(event.key)) {
            event.preventDefault();
          }
        }}
        value={props.value}
        onChange={(e) => {
          props.onChange(parseInt(e.currentTarget.value) || 0);
          e.currentTarget.select();
        }}
        onFocus={(e) => {
          e.currentTarget.select();
        }}
      />
    </>
  );
}

export default NumberFormNatural;
