// pages/api/images.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const imagesDir = path.join(process.cwd(), "public/assets/Home-Background");
  const files = fs.readdirSync(imagesDir);

  // Filter out only the image files
  const images = files.filter((file) => /\.(png|jpe?g|svg)$/.test(file));

  // Send the list of image paths as JSON
  res.status(200).json(images.map((file) => `/assets/Home-Background/${file}`));
}
