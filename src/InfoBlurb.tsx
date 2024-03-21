import HorizontalGroup from "./components/HorizontalGroup";

function InfoBlurb() {
  return (
    <HorizontalGroup
      items={[
        <div style={{ color: "white" }}>
          For more infomation, go to{" "}
          <a href="https://github.com/albertzevanescent/Athenion-Card-Maker">
            GitHub Page
          </a>{" "}
          and{" "}
          <a href="https://albertzevanescent.github.io/Athenion-Fan-Project">
            Game Page
          </a>
          .
        </div>,
      ]}
    ></HorizontalGroup>
  );
}

export default InfoBlurb;
