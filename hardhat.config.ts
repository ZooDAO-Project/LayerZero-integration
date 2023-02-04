import * as dotenv from 'dotenv'

dotenv.config()

import { HardhatUserConfig, task } from 'hardhat/config'

import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import 'solidity-coverage'
import 'hardhat-gas-reporter'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import '@openzeppelin/hardhat-upgrades'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
	const accounts = await hre.ethers.getSigners()

	for (const account of accounts) {
		console.log(account.address)
	}
})

function getMnemonic(networkName: string) {
	if (networkName) {
		const mnemonic = process.env['MNEMONIC_' + networkName.toUpperCase()]
		if (mnemonic && mnemonic !== '') {
			return mnemonic
		}
	}

	const mnemonic = process.env.MNEMONIC
	if (!mnemonic || mnemonic === '') {
		return 'test test test test test test test test test test test junk'
	}

	return mnemonic
}

function getPrivateKey() {
	const privateKey = process.env.PRIVATE_KEY
	if (!privateKey || privateKey === '') {
		throw new Error("Private key doesn't specified in .env file")
	}

	return privateKey
}

function accounts() {
	return [getPrivateKey()]
	//return { mnemonic: getMnemonic(chainKey) }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
	solidity: {
		compilers: [
			{
				version: '0.8.4',
				settings: {
					optimizer: {
						enabled: true,
						runs: 200,
					},
				},
			},
			{
				version: '0.8.13',
				settings: {
					optimizer: {
						enabled: true,
						runs: 200,
					},
				},
			},
		],
	},

	// solidity: "0.8.4",
	contractSizer: {
		alphaSort: false,
		runOnCompile: true,
		disambiguatePaths: false,
	},

	namedAccounts: {
		deployer: {
			default: 0, // wallet address 0, of the mnemonic in .env
		},
		proxyOwner: {
			default: 1,
		},
	},

	etherscan: {
		apiKey: {
			// Moonbeam
			moonbeam: process.env.MOONBEAMSCAN_TOKEN as string, // Moonbeam Moonscan API Key
			// moonriver: process.env.MOONRIVERSCAN_TOKEN, // Moonriver Moonscan API Key
			moonbaseAlpha: process.env.MOONBEAMSCAN_TOKEN as string, // Moonbeam Moonscan API Key
			// Ethereum
			mainnet: process.env.ETHERSCAN_TOKEN as string,
			goerli: process.env.ETHERSCAN_TOKEN as string,
			// Polygon
			polygon: process.env.POLYGONSCAN_TOKEN as string,
			polygonMumbai: process.env.POLYGONSCAN_TOKEN as string,
			bsc: process.env.BSCSCAN_TOKEN as string,
			bscTestnet: process.env.BSCSCAN_TOKEN as string,
		},
	},

	networks: {
		hardhat: {
			forking: {
				url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
				// url: 'https://eth-rinkeby.alchemyapi.io/v2/y4o-h3QndsszyN2IqjF8myShdXud6RRc',
				// url: 'https://polygon-mumbai.g.alchemy.com/v2/xuvttDBAAQvHjBMWurgJzXCKjsWyp8x_',
			},
		},
		ethereum: {
			url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', // public infura endpoint
			chainId: 1,
			accounts: accounts(),
		},
		bsc: {
			url: 'https://bsc-dataseed1.binance.org',
			chainId: 56,
			accounts: accounts(),
		},
		avalanche: {
			url: 'https://api.avax.network/ext/bc/C/rpc',
			chainId: 43114,
			accounts: accounts(),
		},
		polygon: {
			url: 'https://rpc-mainnet.maticvigil.com',
			chainId: 137,
			accounts: accounts(),
		},
		goerli: {
			url: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', // public infura endpoint
			chainId: 5,
			accounts: accounts(),
		},
		arbitrum: {
			url: `https://arb1.arbitrum.io/rpc`,
			chainId: 42161,
			accounts: accounts(),
		},
		optimism: {
			url: `https://mainnet.optimism.io`,
			chainId: 10,
			accounts: accounts(),
		},
		fantom: {
			url: `https://rpcapi.fantom.network`,
			chainId: 250,
			accounts: accounts(),
		},
		'bsc-testnet': {
			url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
			chainId: 97,
			accounts: accounts(),
		},
		fuji: {
			url: `https://api.avax-test.network/ext/bc/C/rpc`,
			chainId: 43113,
			accounts: accounts(),
		},
		mumbai: {
			url: 'https://rpc-mumbai.matic.today/',
			chainId: 80001,
			accounts: accounts(),
		},
		'arbitrum-goerli': {
			url: `https://goerli-rollup.arbitrum.io/rpc/`,
			chainId: 421613,
			accounts: accounts(),
		},
		'optimism-goerli': {
			url: `https://goerli.optimism.io/`,
			chainId: 420,
			accounts: accounts(),
		},
		'fantom-testnet': {
			url: `https://rpc.testnet.fantom.network/`,
			chainId: 4002,
			accounts: accounts(),
		},
		moonbeam: {
			url: `https://1rpc.io/glmr`,
			chainId: 1284,
			accounts: accounts(),
		},
		moonbase: {
			url: `https://rpc.api.moonbase.moonbeam.network`,
			chainId: 1287,
			accounts: accounts(),
		},
	},
}

export default config
