// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Test.sol";
import {OssNFT} from "../src/OssNFT.sol";

contract OssNFTTest is Test {
    OssNFT oss;

    address allowlistedAddress = address(0x1);
    address nonAllowlistedAddress = address(0x2);

    string constant INITIAL_URI = "ipfs://QmWAA8mEDoS9kQfzdW1PdaPwbWKe1JDDMemhNRB3J5nczc";

    function setUp() public {
        oss = new OssNFT(INITIAL_URI);
        address[] memory addresses = new address[](1);
        addresses[0] = allowlistedAddress;
        oss.addToAllowlist(addresses);
    }

    function testMintAllowlisted() public {
        vm.prank(allowlistedAddress);
        oss.mint();

        assertEq(oss.balanceOf(allowlistedAddress, 0), 1);
    }

    function testMintNotAllowlisted() public {
        vm.prank(nonAllowlistedAddress);
        vm.expectRevert(OssNFT.NotOnAllowlist.selector);
        oss.mint();
    }

    // function testMintRemovesFromAllowlist() public {
    //     vm.prank(allowlistedAddress);
    //     oss.mint();

    //     assertEq(oss.isOnAllowlist(allowlistedAddress), false);

    //     vm.prank(allowlistedAddress);
    //     vm.expectRevert(OssNFT.AlreadyMinted.selector);
    //     oss.mint();
    // }

    // function testCannotMintTwice() public {
    //     vm.prank(allowlistedAddress);
    //     oss.mint();

    //     vm.prank(allowlistedAddress);
    //     vm.expectRevert(OssNFT.AlreadyMinted.selector);
    //     oss.mint();
    // }

    function testCannotTransfer() public {
        vm.prank(allowlistedAddress);
        oss.mint();

        vm.prank(allowlistedAddress);
        vm.expectRevert(OssNFT.NotTransferrable.selector);
        oss.safeTransferFrom(allowlistedAddress, nonAllowlistedAddress, 0, 1, "");
    }

    function testCannotBatchTransfer() public {
        vm.prank(allowlistedAddress);
        oss.mint();

        vm.prank(allowlistedAddress);
        uint256[] memory ids = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        ids[0] = 0;
        amounts[0] = 1;
        vm.expectRevert(OssNFT.NotTransferrable.selector);
        oss.safeBatchTransferFrom(allowlistedAddress, nonAllowlistedAddress, ids, amounts, "");
    }

    function testURI() public view {
        assertEq(oss.uri(0), INITIAL_URI);
    }
}
