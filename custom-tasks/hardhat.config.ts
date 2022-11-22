import { task, subtask, HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

task('hello', "Prints a greeting'")
  .addOptionalParam(
    'greeting',
    'The greeting to print',
    'Eattheblocks Viewers!'
  )
  .setAction(async ({ greeting }) => {
    console.log(`Hello, ${greeting}`)
  })

task(
  'accounts',
  'Prints the list of accounts and their balances',
  async (taskArguments, hre, runSuper) => {
    console.log('Task Arguments are: ', taskArguments)
    const accounts = await hre.ethers.getSigners()
 
    for (const account of accounts) {
      await hre.run('balance', { address: account.address })
    }
  }
)
subtask('balance', 'Gets the balance of an address')
  .addParam('address', "The account's address")
  .setAction(async (taskArguments, hre) => {
    const balance = await hre.ethers.provider.getBalance(taskArguments.address)
    console.log(
      `${taskArguments.address}: ${hre.ethers.utils.formatEther(balance)} ETH`
    )
  }
)

const config: HardhatUserConfig = {
  solidity: "0.8.17",
    paths: {
    sources: './contracts',
    artifacts: './src/artifacts',
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    }
  }
};

export default config;
