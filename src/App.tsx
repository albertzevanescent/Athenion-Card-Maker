import { useState, useEffect } from "react";

import HorizontalGroup from "./components/HorizontalGroup";
import {
  updateDraw,
  downloadCard,
  setImage,
  setSampleImage,
  setFrame,
} from "./Canvas";

import CardData from "./CardData";
import CardName from "./CardName";
import CardFactionRarity from "./CardFactionRarity";
import CardArrow from "./CardArrow";
import CardStat from "./CardStat";
import CardText from "./CardText";
import CardArt from "./CardArt";
import CardSample, { setSampleCards } from "./CardSample";
import CardCanvas from "./CardCanvas";
import InfoBlurb from "./InfoBlurb";

function App() {
  setSampleCards();
  const [cardData, setCardData] = useState<CardData>(new CardData());

  useEffect(() => {
    updateDraw(cardData);
  }, [cardData]);

  const setData = (
    arg: string,
    value: string | number | string[] | File | boolean
  ) => {
    setCardData((prevState) => ({
      ...prevState,
      [arg]: value,
    }));
    if (arg == "faction") {
      setFrame(value as string, cardData.rarity);
    } else if (arg == "rarity") {
      setFrame(cardData.faction, value as string);
    } else if (arg == "image") {
      if (typeof value != typeof "string") {
        setImage(value as string);
      } else {
        setSampleImage(value as string);
      }
    }
  };

  const addTextSpeccial = (specialText: string) => {
    if (!cardData.text.endsWith(" ")) {
      specialText = " " + specialText;
    }
    setData("text", cardData.text + specialText);
  };

  const addTextSprite = (sprite: string) => {
    addTextSpeccial("<s>" + sprite + "</s>");
  };

  const addTextKeyword = (sprite: string) => {
    addTextSpeccial("<b>" + sprite + "</b>");
  };

  const setSample = (sampleCard: CardData) => {
    setCardData(sampleCard);
    setFrame(sampleCard.faction, sampleCard.rarity);
    setSampleImage(sampleCard.image);
  };

  const exportData = () => {
    const file = new Blob([JSON.stringify(cardData)], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = cardData.name + ".json";
    link.click();
  };

  const importData = (file: File) => {
    file.text().then((text: string) => {
      const importCardData: CardData = JSON.parse(text);
      setCardData(importCardData);
      setFrame(importCardData.faction, importCardData.rarity);
    });
  };

  return (
    <div
      style={{
        backgroundImage: "url(images/icons/BG.png)",
        height: "100vh",
        width: "100vw",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <HorizontalGroup
        items={[
          <>
            <CardSample setSample={setSample}></CardSample>
            <CardName value={cardData.name} setValue={setData}></CardName>
            <CardFactionRarity
              factionValue={cardData.faction}
              rarityValue={cardData.rarity}
              setValue={setData}
            ></CardFactionRarity>
            <CardArrow value={cardData.arrows} setValue={setData}></CardArrow>
            <CardStat
              soulValue={cardData.soul}
              attackValue={cardData.attack}
              healthValue={cardData.health}
              armorValue={cardData.armor}
              setValue={setData}
            ></CardStat>
            <CardText
              addTextSprite={addTextSprite}
              addTextKeyword={addTextKeyword}
              value={cardData.text}
              setValue={setData}
            ></CardText>
            <CardArt
              scaleValue={cardData.scale}
              offsetXValue={cardData.offsetX}
              offsetYValue={cardData.offsetY}
              setValue={setData}
            ></CardArt>
          </>,
          <CardCanvas
            value={cardData.hideUI}
            setValue={setData}
            downloadCard={downloadCard}
            exportData={exportData}
            importData={importData}
          ></CardCanvas>,
        ]}
      ></HorizontalGroup>
      <InfoBlurb></InfoBlurb>
    </div>
  );
}

export default App;
