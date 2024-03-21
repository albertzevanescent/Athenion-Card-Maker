import HorizontalGroup from "./components/HorizontalGroup";
import InputNumberNatural from "./components/InputNumberNatural";

interface Props {
  soulValue: number;
  attackValue: number;
  healthValue: number;
  armorValue: number;
  setValue: (
    arg: string,
    data: string | number | string[] | File | boolean
  ) => void;
}

function CardStat(props: Props) {
  return (
    <HorizontalGroup
      items={[
        <InputNumberNatural
          title="Soul"
          value={props.soulValue}
          setValue={props.setValue}
          arg="soul"
        ></InputNumberNatural>,
        <InputNumberNatural
          title="Attack"
          value={props.attackValue}
          setValue={props.setValue}
          arg="attack"
        ></InputNumberNatural>,
        <InputNumberNatural
          title="Health"
          value={props.healthValue}
          setValue={props.setValue}
          arg="health"
        ></InputNumberNatural>,
        <InputNumberNatural
          title="Armor"
          value={props.armorValue}
          setValue={props.setValue}
          arg="armor"
        ></InputNumberNatural>,
      ]}
    ></HorizontalGroup>
  );
}

export default CardStat;
