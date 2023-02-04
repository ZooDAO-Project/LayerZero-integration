const LZ_ENDPOINTS = require('../constants/layerzeroEndpoints.json')

module.exports = async function ({ deployments, getNamedAccounts }) {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()
	console.log(`>>> your address: ${deployer}`)

	const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]
	const minGasToStore = 1000000

	console.log(`[${hre.network.name}] Endpoint Address: ${lzEndpointAddress}`)

	await deploy('ZooNFT', {
		from: deployer,
		args: [minGasToStore, lzEndpointAddress],
		log: true,
		waitConfirmations: 1,
	})
}

module.exports.tags = ['ZooNFT']
