import '@nomiclabs/hardhat-ethers';
import { ethers } from 'hardhat';
import { NodeNFT__factory, Playa3ullToken__factory, FakeERC20__factory, FakeERC721__factory  } from '../../typechain';
import { DeployedContracts } from './contract-addresses';

import { toAtto } from '../../shared/utils';

const EPOCH_SIZE_SECONDS = 60; // Every minute for local testing
const EPOCH_REWARD = toAtto(6849315 / 24);   // Daily rewards per hour 

async function main() {
  const [owner] = await ethers.getSigners();

  const fakeUSD = await new FakeERC20__factory(owner).deploy("USD", "USD");

  // Print config required to run dApp
  const deployedContracts: DeployedContracts = {
    USDC:         fakeUSD.address,
    PRESALE: '',
    OWNER: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // Account #0
  };

  await fakeUSD.connect(owner).mint(deployedContracts.OWNER, "50000000000000000000000");

  const contractAddressAsMapping = deployedContracts as unknown as {[key: string]: string}
  
  console.log();
  console.log('=========================================');
  for (const envvar in contractAddressAsMapping) {
    console.log(`${envvar}=${contractAddressAsMapping[envvar]}`);
  }
  console.log('=========================================');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });