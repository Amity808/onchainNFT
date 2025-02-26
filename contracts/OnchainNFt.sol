// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

contract OnchainNft is ERC721URIStorage {

    uint256 public tokenCounter;
    constructor() ERC721("OnchainNFT", "ONFT") {
        tokenCounter = 0;
    }

    
    function mintNft(string memory imageURI) public {
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, imageURI);
        tokenCounter++;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function tokenURI(uint256 tokenId) public view override(ERC721URIStorage) returns (string memory) {
        string memory imageURI = ERC721URIStorage.tokenURI(tokenId);

        return string(
            abi.encodePacked(
                _baseURI(),
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name": "', 
                            name(), 
                            '", "description": "An NFT that reflects the owners mood", ',
                            '"attributes": [{"trait_type": "moodiness", "value": 100}], ',
                            '"image": "', 
                            imageURI, 
                            '"}'
                        )
                    )
                )
            )
        );
    }

    
}