const LZ_ENDPOINTS = require('../constants/layerzeroEndpoints.json')

module.exports = async function ({ deployments, getNamedAccounts }) {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()
	console.log(`>>> your address: ${deployer}`)

	const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]
	const minGasToStore = 300000

	console.log(`[${hre.network.name}] Endpoint Address: ${lzEndpointAddress}`)

	const args = [minGasToStore, lzEndpointAddress]
	const result = await deploy('ZooDAOGenP', {
		from: deployer,
		args,
		log: true,
		waitConfirmations: 1,
	})

	await verifyContract(result.address, args)
}

module.exports.tags = ['ZooDAOGenP']
