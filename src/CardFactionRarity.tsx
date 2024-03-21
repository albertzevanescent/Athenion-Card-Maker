import HorizontalGroup from "./components/HorizontalGroup";
import InputSelect from "./components/InputSelect";
import { factions, rarities } from "./CardData";

interface Props {
  factionValue: string;
  rarityValue: string;
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
}

function CardFactionRarity(props: Props) {
  return (
    <HorizontalGroup
      items={[
        <InputSelect
          value={props.factionValue}
          setValue={props.setValue}
          title="Faction"
          items={factions}
          arg="faction"
        ></InputSelect>,
        <InputSelect
          value={props.rarityValue}
          setValue={props.setValue}
          title="Rarity"
          items={rarities}
          arg="rarity"
        ></InputSelect>,
      ]}
    ></HorizontalGroup>
  );
}

export default CardFactionRarity;
