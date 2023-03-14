import { ethers } from "ethers";
import { readFileSync, writeFileSync } from "fs";
import * as dotenv from "dotenv";

dotenv.config();
const { PRIVATE_KEY_PASSWORD = "", PRIVATE_KEY = "" } = process.env;

async function main() {
  const wallet = new ethers.Wallet(PRIVATE_KEY);

  const encryptedJsonKey = await wallet.encrypt(PRIVATE_KEY_PASSWORD);

  writeFileSync("./encryptedJSONKey.json", encryptedJsonKey, "utf-8");
}
main();
