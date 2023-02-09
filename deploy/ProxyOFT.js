const LZ_ENDPOINTS = require('../constants/layerzeroEndpoints.json')

module.exports = async function ({ deployments, getNamedAccounts }) {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()
	console.log(`>>> your address: ${deployer}`)

	const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]
	console.log(`[${hre.network.name}] Endpoint Address: ${lzEndpointAddress}`)

	await deploy('ProxyOFT', {
		from: deployer,
		args: [lzEndpointAddress, '0x09F098B155D561Fc9F7BcCc97038b7e3d20bAF74'],
		log: true,
		waitConfirmations: 1,
	})
}

module.exports.tags = ['ProxyOFT']
