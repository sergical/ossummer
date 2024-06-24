// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract OssNFT is ERC1155, Ownable2Step {
    uint256 public constant CONTRIBUTOR_NFT = 0;
    mapping(address => bool) public allowlist;
    mapping(address => bool) public hasMinted;
    string private _contributorTokenURI;

    error AlreadyMinted();
    error NotTransferrable();
    error NotOnAllowlist();

    constructor(string memory initialURI) ERC1155(initialURI) Ownable(msg.sender) {
        _contributorTokenURI = initialURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        require(tokenId == CONTRIBUTOR_NFT, "Invalid token ID");
        return _contributorTokenURI;
    }

    function setContributorTokenURI(string memory newURI) external onlyOwner {
        _contributorTokenURI = newURI;
    }

    function addToAllowlist(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            allowlist[addresses[i]] = true;
        }
    }

    function isOnAllowlist(address user) external view returns (bool) {
        return allowlist[user];
    }

    function mint() external {
        if (!allowlist[msg.sender]) revert NotOnAllowlist();
        if (hasMinted[msg.sender]) revert AlreadyMinted();

        _mint(msg.sender, CONTRIBUTOR_NFT, 1, "");
        allowlist[msg.sender] = false; // remove from allowlist after minting
        hasMinted[msg.sender] = true;
    }

    function safeTransferFrom(address, address, uint256, uint256, bytes memory) public pure override {
        revert NotTransferrable();
    }

    function safeBatchTransferFrom(address, address, uint256[] memory, uint256[] memory, bytes memory)
        public
        pure
        override
    {
        revert NotTransferrable();
    }
}
