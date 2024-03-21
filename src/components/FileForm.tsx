import Form from "react-bootstrap/Form";

interface Props {
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
  title: string;
  arg: string;
}

function FileForm(props: Props) {
  return (
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label style={{ color: "white" }}>{props.title}</Form.Label>
      <Form.Control
        type="file"
        accept=".png, .jpeg"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          if (target.files == null) {
            return;
          }
          props.setValue(props.arg, target.files[0]);
        }}
      />
    </Form.Group>
  );
}

export default FileForm;
