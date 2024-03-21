import Button from "react-bootstrap/Button";

interface Props {
  title: string;
  onClick: () => void;
}

function ButtonComponent(props: Props) {
  return (
    <>
      <Button onClick={props.onClick}>{props.title}</Button>{" "}
    </>
  );
}

export default ButtonComponent;
