from PIL import Image


def cropBox(input, mask, output, yOffset):
    img1 = Image.open(input)
    img1 = img1.convert("RGBA")
    imgData = img1.getdata()
    size = imgData.size

    img2 = Image.open(mask)
    img2 = img2.convert("RGBA")
    maskData = list(img2.getdata())

    maskData = maskData[yOffset * size[0]:] + [(0,0,0,0) for i in range(yOffset * size[0])]
    newData = []

    for i in range(size[1]):
        for j in range(size[0]):
            if (maskData[i * size[0] + j][3] > 0):
                newData.append(imgData[i * size[0] + j])
            else:
                newData.append((0,0,0,0))

    outImg = Image.new(mode="RGBA", size=size)
    outImg.putdata(newData)
    outImg.save(output, "PNG")


for rarity in ["Common", "Rare", "Epic", "Legendary"]:
    input = "images/frames/Card_Box_" + rarity + ".png"
    mask = "images/frames/Box_Mask.png"
    output = "images/frames/Card_Box_" + rarity + "_Masked.png"
    cropBox(input, mask, output, 20)