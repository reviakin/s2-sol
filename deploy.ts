import { ethers } from "ethers";
import { readFileSync } from "fs";
import * as dotenv from "dotenv";

dotenv.config();
const {
  RPC_URL = "",
  PRIVATE_KEY_PASSWORD,
  RPC_URL_TEST,
  PRIVATE_KEY_TEST = "",
  PRIVATE_KEY = "",
} = process.env;

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  //  const provider = new ethers.JsonRpcProvider(RPC_URL_TEST);
  //const wallet = new ethers.Wallet(PRIVATE_KEY_TEST, provider);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  /*
  * make a contract by json key
  const jsonKey = readFileSync("./encryptedJSONKey.json", "utf-8");
  let wallet = ethers.Wallet.fromEncryptedJsonSync(
    jsonKey,
    PRIVATE_KEY_PASSWORD
  );
  wallet = wallet.connect(provider);
  */
  const abi = readFileSync("./S2_sol_SimpleStorage.abi", "utf-8");
  const binary = readFileSync("./S2_sol_SimpleStorage.bin", "utf-8");

  const contractFactory = await new ethers.ContractFactory(abi, binary, wallet);

  const contract = await contractFactory.deploy();
  await contract.deploymentTransaction()?.wait(1);

  const favN = await contract.retrieve();
  const result = await contract.store("10");
  await result.wait(1);
  const newFavN = await contract.retrieve();
  console.log(favN.toString(), newFavN.toString());
  // console.log(contract);
}
main();
