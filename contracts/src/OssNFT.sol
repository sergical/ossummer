// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@ERC721A/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OssNFT is ERC721A, Ownable {
    mapping(address => bool) public allowlist;

    constructor() ERC721A("Open Source Summer Contributor", "OSS") Ownable(msg.sender) {}

    function addToAllowlist(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            allowlist[addresses[i]] = true;
        }
    }

    function mint() external {
        require(allowlist[msg.sender], "You are not on the allowlist");
        _safeMint(msg.sender, 1);
        allowlist[msg.sender] = false; // remove from allowlist after minting
    }
}
