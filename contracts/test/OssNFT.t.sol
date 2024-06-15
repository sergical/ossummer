// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Test.sol";
import {OssNFT} from "../src/OssNFT.sol";

contract OssNFTTest is Test {
    OssNFT oss;

    address allowlistedAddress = address(0x1);
    address nonAllowlistedAddress = address(0x2);

    function setUp() public {
        oss = new OssNFT();
        address[] memory addresses = new address[](1);
        addresses[0] = allowlistedAddress;
        oss.addToAllowlist(addresses);
    }

    function testMintAllowlisted() public {
        vm.prank(allowlistedAddress);
        oss.mint();

        assertEq(oss.balanceOf(allowlistedAddress), 1);
    }

    function testMintNotAllowlisted() public {
        vm.prank(nonAllowlistedAddress);
        vm.expectRevert("You are not on the allowlist");
        oss.mint();
    }

    function testMintRemovesFromAllowlist() public {
        vm.prank(allowlistedAddress);
        oss.mint();

        vm.prank(allowlistedAddress);
        vm.expectRevert("You are not on the allowlist");
        oss.mint();
    }
}
