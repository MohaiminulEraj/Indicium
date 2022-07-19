// // SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;

// import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
// import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

// contract MyNft is ERC721, ERC721URIStorage, Ownable {
//     using Counters for Counters.Counter;

//     Counters.Counter private _tokenIdCounter;

//     mapping(string => uint8) existingURIs;

//     struct NftItem {
//         uint256 tokenId;
//         uint256 price;
//         address creator;
//         bool isListed;
//         string ipfsAddress;
//     }

//     uint256 public listingPrice = 0.025 ether;

//     constructor() ERC721("MyNFT", "MNFT") {}

//     function _baseURI() internal pure override returns (string memory) {
//         return "ipfs://";
//     }

//     function safeMint(address to, string memory uri) public onlyOwner {
//         uint256 tokenId = _tokenIdCounter.current();
//         _tokenIdCounter.increment();
//         _safeMint(to, tokenId);
//         _setTokenURI(tokenId, uri);
//     }

//     // The following functions are overrides required by Solidity.

//     function _burn(uint256 tokenId)
//         internal
//         override(ERC721, ERC721URIStorage)
//     {
//         super._burn(tokenId);
//     }

//     function tokenURI(uint256 tokenId)
//         public
//         view
//         override(ERC721, ERC721URIStorage)
//         returns (string memory)
//     {
//         return super.tokenURI(tokenId);
//     }

//     function isContentOwned(string memory uri) public view returns (bool) {
//         return existingURIs[uri] == 1;
//     }

//     function payToMint(address recepient, string memory metadataURI)
//         public
//         payable
//         returns (uint256)
//     {
//         require(existingURIs[metadataURI] != 0, "NFT already minted!");
//         require(msg.value >= 0.05 ether, "Need to pay up!");
//         uint256 newItemId = _tokenIdCounter.current();
//         _tokenIdCounter.increment();
//         existingURIs[metadataURI] = 1;

//         _mint(recepient, newItemId);
//         _setTokenURI(newItemId, metadataURI);

//         return newItemId;
//     }

//     function count() public view returns (uint256) {
//         return _tokenIdCounter.current();
//     }
// }
