import { useRef, useEffect } from "react";
import CardData, { factionConv, arrowConv } from "./CardData";

let context: CanvasRenderingContext2D;
let cardData: CardData = new CardData();
const imageSave = {
  cardFrame: new Image(),
  cardBox: new Image(),
  cardMask: new Image(),
  cardArt: new Image(),
  iconAttack: new Image(),
  iconHealth: new Image(),
  iconArmor: new Image(),
  iconArrow: new Image(),
  iconMana: new Image(),
  iconQuest: new Image(),
  iconReward: new Image(),
};
const textIcons: { [id: string]: { size: number; image: HTMLImageElement } } = {
  attack: { size: 25.6, image: imageSave.iconAttack },
  health: { size: 25.6, image: imageSave.iconHealth },
  armor: { size: 25.6, image: imageSave.iconArmor },
  mana: { size: 25.6, image: imageSave.iconMana },
  quest: { size: 25.6, image: imageSave.iconQuest },
  reward: { size: 25.6, image: imageSave.iconReward },
};
const awaitingLoad = 14;
let doneLoad = 0;

const nameLineWidth = 300;
const nameLineSpacing = 30;
const nameCenterY = 60;
const textLineWidth = 300;
const textLineSpacing = 24;
const textLineMax = 7;
const textCenterY = 465;
const textNoSpace = " ";
const textNewLine = "\n";

const fontDIN2014Bold = new FontFace(
  "DIN2014-Bold",
  "url(../fonts/DIN2014-Bold.ttf)"
);
const fontMaitreeBold = new FontFace(
  "Maitree-Bold",
  "url(../fonts/Maitree-Bold.ttf)"
);
const fontMaitreeRegular = new FontFace(
  "Maitree-Regular",
  "url(../fonts/Maitree-Regular.ttf)"
);

function setSampleImage(art: string) {
  imageSave.cardArt.src = art;
  doneLoad--;
}

function setImage(art: string) {
  const reader = new FileReader();
  const blob = new Blob([art], { type: "image/png" });
  reader.readAsDataURL(blob);
  reader.onload = () => {
    imageSave.cardArt.src = reader.result as string;
  };
  doneLoad--;
}

function setFrame(faction: string, rarity: string) {
  imageSave.cardFrame.src =
    "../images/frames/Card_" + rarity + "_" + factionConv(faction) + ".png";
  doneLoad--;
  imageSave.cardBox.src = "../images/frames/Card_Box_" + rarity + "_Masked.png";
  doneLoad--;
}

function drawImage(
  img: HTMLImageElement,
  scale: number,
  shifX: number = 0,
  shiftY: number = 0,
  text: string = "",
  textOffsetY: number = 0,
  skipDraw: boolean = false
) {
  const centerShift_x = (context.canvas.width - img.width * scale) / 2,
    centerShift_y = (context.canvas.height - img.height * scale) / 2;
  if (!skipDraw) {
    context.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x + shifX,
      centerShift_y + shiftY,
      img.width * scale,
      img.height * scale
    );
  }
  if (text != "") {
    drawText(
      text,
      centerShift_x + shifX + (img.width * scale) / 2,
      centerShift_y + shiftY + (img.height * scale) / 2 + textOffsetY,
      true
    );
  }
}

function drawText(text: string, x: number, y: number, outline: boolean) {
  if (outline) {
    context.strokeText(text, x, y);
  }
  context.fillText(text, x, y);
}

function setTextStat() {
  context.font = 48 + "px " + "DIN2014-Bold";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  context.strokeStyle = "black";
  context.lineWidth = 5;
}

function setTextName() {
  context.font = 20 + "px " + "Maitree-Bold";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  context.strokeStyle = "black";
  context.lineWidth = 5;
}

function setTextEffect() {
  context.font = 18 + "px " + "Maitree-Regular";
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.fillStyle = "black";
  context.strokeStyle = "black";
  context.lineWidth = 0;
}

function setTextBold(bold: boolean) {
  if (bold) {
    context.font = "bold " + context.font;
  } else {
    context.font = context.font.replace("bold ", "");
  }
}

function drawArt() {
  drawImage(imageSave.cardMask, 0.5);
  context.globalCompositeOperation = "source-in";
  drawImage(
    imageSave.cardArt,
    cardData.scale,
    cardData.offsetX,
    cardData.offsetY
  );
  context.restore();
}

function drawFrame() {
  context.save();
  context.globalCompositeOperation = "destination-over";
  drawImage(imageSave.cardFrame, 0.5);
  context.restore();
}

function drawStats() {
  context.save();
  setTextStat();
  context.globalCompositeOperation = "source-over";
  drawImage(imageSave.iconHealth, 0.5, -160, -87.5, "" + cardData.health, 6);
  drawImage(imageSave.iconAttack, 0.5, -160, -140, "" + cardData.attack, 6);
  if (cardData.armor != 0) {
    drawImage(imageSave.iconArmor, 0.5, -160, -22.5, "" + cardData.armor, 1.5);
  }
  drawImage(imageSave.iconArrow, 0.5, -160, -230, "" + cardData.soul, 3, true);
  context.translate(45, 67.5);
  arrowConv(cardData.arrows).forEach((arrow) => {
    if (arrow) {
      drawImage(imageSave.iconArrow, 0.5, -205, -330);
    }
    context.rotate((45 * Math.PI) / 180);
  });
  context.restore();
}

function drawEffect() {
  context.save();
  context.globalCompositeOperation = "source-over";
  drawImage(imageSave.cardBox, 0.5, 4, 162.5);
  setTextEffect();
  context.globalCompositeOperation = "source-over";

  let lines = getLines(cardData.text, textLineWidth);
  if (lines.length > textLineMax) {
    lines = lines.slice(0, textLineMax);
  }
  drawEffectText(lines);
  context.restore();
}

function drawEffectText(lines: string[]) {
  let lineNum = 0;
  const shiftY = ((lines.length - 1) * -textLineSpacing) / 2;
  lines.forEach((line) => {
    lineWrite(line, textCenterY + lineNum * textLineSpacing + shiftY);
    lineNum++;
  });
}

function drawName() {
  context.save();
  setTextName();
  context.globalCompositeOperation = "source-over";
  const lines = getLines(cardData.name, nameLineWidth);
  let lineNum = 0;
  lines.forEach((line) => {
    drawText(
      line,
      context.canvas.width / 2,
      nameCenterY + lineNum * nameLineSpacing,
      true
    );
    lineNum++;
  });
  context.restore();
}

function textSplit(text: string) {
  const originalWords = text.split(" ");
  let combineWord = "",
    words: string[] = [],
    specialWord = false,
    newLineWords: string[] = [];

  originalWords.forEach((word) => {
    if (word.indexOf("\n") == -1) {
      newLineWords.push(word);
    } else {
      word.split("\n").forEach((newlineWord) => {
        newLineWords.push(newlineWord);
        newLineWords.push(textNewLine);
      });
      newLineWords.pop();
    }
  });

  newLineWords.forEach((word) => {
    if (word.match(/</g)?.length == 2 && word.match(/>/g)?.length == 2) {
      if (word.endsWith(">")) {
        words.push(word);
      } else {
        words.push(word.slice(0, word.length - 1));
        words.push(textNoSpace + word[word.length - 1]);
      }
    } else if (word.indexOf("<") == -1) {
      if (specialWord) {
        combineWord += " " + word;
      } else {
        words.push(word);
      }
    } else {
      if (!specialWord) {
        combineWord = word;
      } else {
        if (word.endsWith(">")) {
          words.push(combineWord + " " + word);
        } else {
          words.push(combineWord + " " + word.slice(0, word.length - 1));
          words.push(textNoSpace + word[word.length - 1]);
        }
      }
      specialWord = !specialWord;
    }
  });
  return words;
}

function textSpace(text: string, cond: boolean) {
  if (text == textNewLine) {
    return "";
  } else if (text.startsWith(textNoSpace)) {
    return text.slice(textNoSpace.length);
  } else if (cond) {
    return " " + text;
  }
  return text;
}

function getLines(text: string, maxWidth: number) {
  let words = textSplit(text),
    lines = [],
    currentLine = "",
    word = "",
    width = 0;
  if (words[0] == "") {
    words.shift();
  }
  for (let i = 0; i < words.length; i++) {
    word = words[i];
    if (word == textNewLine) {
      lines.push(currentLine);
      currentLine = "";
      continue;
    }
    word = textSpace(word, i > 0);
    width = lineWidth(currentLine + word);
    if (word.indexOf("\n") != -1) {
      currentLine += word.slice(0, word.indexOf("\n"));
      lines.push(currentLine);
      currentLine = word.slice(word.indexOf("\n") + 1).trim();
    } else if (width < maxWidth) {
      currentLine += word;
    } else {
      lines.push(currentLine);
      currentLine = word.trim();
    }
  }
  lines.push(currentLine);
  return lines;
}

function lineWidth(line: string) {
  let words = textSplit(line),
    word = "",
    width = 0,
    boldWord = false,
    spriteWord = false;
  if (words[0] == "") {
    words.shift();
  }
  for (let i = 0; i < words.length; i++) {
    word = words[i];
    boldWord = false;
    spriteWord = false;
    if (word.startsWith("<b>") && word.endsWith("</b>")) {
      word = word.replace("<b>", "").replace("</b>", "");
      boldWord = true;
    } else if (
      word.startsWith("<s>") &&
      word.endsWith("</s>") &&
      word.charAt(3).toLowerCase() + word.slice(4, word.length - 4) in textIcons
    ) {
      word = word.charAt(3).toLowerCase() + word.slice(4, word.length - 4);
      spriteWord = true;
    }
    word = textSpace(word, i > 0 && !spriteWord);
    if (spriteWord) {
      width += textIcons[word.charAt(0).toLowerCase() + word.slice(1)].size;
    } else {
      setTextBold(boldWord);
      width += context.measureText(word).width;
      setTextBold(false);
    }
  }
  return width;
}

function lineWrite(line: string, y: number) {
  let words = textSplit(line),
    word = "",
    maxWidth = lineWidth(line),
    width = 0,
    boldWord = false,
    spriteWord = false;

  for (let i = 0; i < words.length; i++) {
    word = words[i];
    boldWord = false;
    spriteWord = false;
    if (word.startsWith("<b>") && word.endsWith("</b>")) {
      word = word.replace("<b>", "").replace("</b>", "");
      boldWord = true;
    } else if (
      word.startsWith("<s>") &&
      word.endsWith("</s>") &&
      word.charAt(3).toLowerCase() + word.slice(4, word.length - 4) in textIcons
    ) {
      word = word.replace("<s>", "").replace("</s>", "");
      spriteWord = true;
    }
    word = textSpace(word, i > 0 && !spriteWord);
    if (spriteWord) {
      drawImage(
        textIcons[word.charAt(0).toLowerCase() + word.slice(1)].image,
        0.2,
        width -
          maxWidth / 2 +
          textIcons[word.charAt(0).toLowerCase() + word.slice(1)].size / 2 +
          context.measureText(" ").width / 2,
        -context.canvas.height / 2 + -context.measureText(" ").width / 2 + y
      );
      width += textIcons[word.charAt(0).toLowerCase() + word.slice(1)].size;
    } else {
      setTextBold(boldWord);
      drawText(word, context.canvas.width / 2 + width - maxWidth / 2, y, false);
      width += context.measureText(word).width;
      setTextBold(false);
    }
  }
}

function drawCard() {
  drawArt();
  if (!cardData.hideUI) {
    drawStats();
    drawEffect();
    drawName();
  }
  drawFrame();
}

function updateDraw(cardDataRef: CardData) {
  cardData = cardDataRef;
  if (doneLoad != awaitingLoad) {
    return;
  }
  drawCard();
}

function downloadCard() {
  const url = context.canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = cardData.name + ".png";
  link.href = url;
  link.click();
}

function incDoneLoad() {
  doneLoad++;
  if (doneLoad == awaitingLoad) {
    drawCard();
  }
}

function loadFont(font: FontFace) {
  document.fonts.add(font);
  incDoneLoad();
}

function setImages() {
  if (imageSave.iconAttack.src != "") {
    return;
  }
  imageSave.cardFrame.onload =
    imageSave.cardBox.onload =
    imageSave.cardMask.onload =
    imageSave.cardArt.onload =
    imageSave.iconAttack.onload =
    imageSave.iconHealth.onload =
    imageSave.iconArmor.onload =
    imageSave.iconArrow.onload =
    imageSave.iconMana.onload =
    imageSave.iconQuest.onload =
    imageSave.iconReward.onload =
      incDoneLoad;

  imageSave.iconAttack.src = "./../images/icons/Symbol_Attack.png";
  imageSave.iconHealth.src = "./../images/icons/Symbol_Health.png";
  imageSave.iconArmor.src = "./../images/icons/Symbol_Armor.png";
  imageSave.iconArrow.src = "./../images/icons/Symbol_Arrow.png";
  imageSave.iconMana.src = "./../images/icons/Symbol_Mana.png";
  imageSave.iconQuest.src = "./../images/icons/Symbol_Quest.png";
  imageSave.iconReward.src = "./../images/icons/Symbol_Reward.png";
  imageSave.cardFrame.src = "./../images/frames/Card_Common_Fire.png";
  imageSave.cardBox.src = "./../images/frames/Card_Box_Common_Masked.png";
  imageSave.cardMask.src = "./../images/frames/Card_Mask.png";
  imageSave.cardArt.src = "./../images/frames/Card_Blank.png";

  fontDIN2014Bold.load().then(() => {
    loadFont(fontDIN2014Bold);
  });
  fontMaitreeBold.load().then(() => {
    loadFont(fontMaitreeBold);
  });
  fontMaitreeRegular.load().then(() => {
    loadFont(fontMaitreeRegular);
  });
}

const Canvas = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasRef = canvas.current;
    if (!canvasRef) {
      return;
    }

    const contextRef = canvasRef.getContext("2d");
    if (!contextRef) {
      return;
    }

    context = contextRef;
    setImages();
  }, []);

  return <canvas ref={canvas} width={410} height={600} />;
};

export default Canvas;
export { updateDraw, downloadCard, setImage, setFrame, setSampleImage };
