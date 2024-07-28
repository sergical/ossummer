// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import "../src/OssNFT.sol";

contract OssNFTScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        string memory initialURI = "ipfs://Qma7JqFtdM1asE6w4u4N55Fni8qBzUPu1ddkborewT2S9p";

        vm.startBroadcast(deployerPrivateKey);

        OssNFT oss = new OssNFT(initialURI);

        vm.stopBroadcast();
        console2.log("OssNFT address: ", address(oss));
    }
}
