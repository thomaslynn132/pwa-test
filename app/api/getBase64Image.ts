import sharp from "sharp";

export async function getBase64Image(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer

    const blurDataURL = await sharp(buffer)
      .resize(20) // Reduce size for efficiency
      .blur(5) // Apply blur effect
      .toBuffer()
      .then((data) => `data:image/jpeg;base64,${data.toString("base64")}`);

    return blurDataURL;
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to process image");
  }
}
