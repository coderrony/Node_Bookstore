import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // current file path: C:\Users\Asus\Desktop\Node_js\NodeBookStore\utils\pathUtils.js
const __dirname = path.dirname(__filename); //current directory: C:\Users\Asus\Desktop\Node_js\NodeBookStore\utils


const rootDir = path.resolve(__dirname, "..").replace(/\\/g, "/");

export default rootDir;