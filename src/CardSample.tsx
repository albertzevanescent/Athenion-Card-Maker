import HorizontalGroup from "./components/HorizontalGroup";
import DropdownForm from "./components/DropdownForm";
import CardData from "./CardData";
import sampleData from "../public/data/SampleCards.json";

interface Props {
  setSample: (item: CardData) => void;
}

let sampleCards: { [id: string]: CardData } = {};

export function setSampleCards() {
  if (Object.keys(sampleCards).length != 0) {
    return;
  }
  sampleData.forEach((sampleCard) => {
    sampleCards[sampleCard.name] = sampleCard;
  });
}
function CardSample(props: Props) {
  return (
    <HorizontalGroup
      items={[
        <DropdownForm
          items={["Choose Sample"].concat(Object.keys(sampleCards))}
          onChange={(sampleName) => {
            props.setSample(sampleCards[sampleName]);
          }}
        ></DropdownForm>,
      ]}
    ></HorizontalGroup>
  );
}

export default CardSample;
