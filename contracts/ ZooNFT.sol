pragma solidity ^0.8.13;

import './token/onft/ONFT721.sol';

import '@openzeppelin/contracts/access/Ownable.sol';

contract ZooNFT is ONFT721 {
	uint256 public totalSupply;
	uint256 public maxTotalSupply = 100;

	string internal baseURI = 'https://gateway.pinata.cloud/ipfs/QmaT9UEzDdxAQRrUWbcXF9j82tjhBXMwZgBrUYgsPfxyxb/1.json';

	constructor(uint256 _minGasToTransfer, address _layerZeroEndpoint)
		ONFT721('ZooDAO Gen 0 Cards', 'ZDC', _minGasToTransfer, _layerZeroEndpoint)
	{}

	function mintTo(address _to) external onlyOwner {
		require(totalSupply < maxTotalSupply, 'ZooNFT: reached total supply');

		_safeMint(_to, ++totalSupply);
	}

	function _baseURI() internal view override returns (string memory) {
		return baseURI;
	}

	function updateBaseURI(string memory _newURI) external onlyOwner {
		baseURI = _newURI;
	}
}
