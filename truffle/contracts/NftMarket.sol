// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";


contract NftMarket is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(string => uint8) existingURIs;

    struct NftItem {
        uint256 tokenId;
        uint256 price;
        address creator;
        bool isListed;
    }

    uint256 public listingPrice = 0.025 ether;

    Counters.Counter private _listedItems;
    Counters.Counter private _tokenIds;
    mapping(address => uint256) private _owendNftsToken;

    mapping(string => bool) private _usedTokenURIs;
    mapping(uint256 => NftItem) private _idToNftItem;

    uint256[] private _allNftsToken;
    

    event NftItemCreated(
        uint256 tokenId,
        uint256 price,
        address creator,
        bool isListed
    );

    constructor() ERC721("AnchorNft", "ANCHOR") {}


    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function setListingPrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "Price must be at least 1 wei");
        listingPrice = newPrice;
    }

    function getNftItem(uint256 tokenId) public view returns (NftItem memory) {
        return _idToNftItem[tokenId];
    }

    function listedItemsCount() public view returns (uint256) {
        return _listedItems.current();
    }

    function tokenURIExists(string memory tokenURI) public view returns (bool) {
        return _usedTokenURIs[tokenURI] == true;
    }

    function totalSupply() public view returns (uint256) {
        return _allNftsToken.length;
    }

    function tokenByIndex(uint256 index) public view returns (uint256) {
        require(index < totalSupply(), "Index out of bounds");
        return _allNftsToken[index];
    }


    function getAllNftsOnSale() public view returns (NftItem[] memory) {
        uint256 allItemsCounts = totalSupply();
        uint256 currentIndex = 0;
        NftItem[] memory items = new NftItem[](_listedItems.current());
        for (uint256 i = 0; i < allItemsCounts; i++) {
            uint256 tokenId = tokenByIndex(i);
            NftItem storage item = _idToNftItem[tokenId];

            if (item.isListed == true) {
                items[currentIndex] = item;
                currentIndex += 1;
            }
        }
        
        return items;
    }
    
    function getOwnedNfts(address account)
        public
        view
        returns (NftItem[] memory)
    {
        require(account != address(0));
        uint256 allItemsCounts = totalSupply();
        uint256 currentIndex = 0;
        NftItem[] memory items = new NftItem[](_owendNftsToken[account]);
        for (uint256 i = 0; i < allItemsCounts; i++) {
            uint256 tokenId = tokenByIndex(i);
            NftItem storage item = _idToNftItem[tokenId];

            if (item.creator == account) {
                items[currentIndex] = item;
                currentIndex += 1;
            }
        }
        
        return items;
    }


    function mintToken(
        string memory tokenURI,
        address account,
        uint256 price
    ) public payable returns (uint256) {
        
        require(account != address(0));

        require(!tokenURIExists(tokenURI), "Token URI already exists");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _tokenIds.increment();
        _listedItems.increment();
        _owendNftsToken[account]++;
        uint256 newTokenId = _tokenIds.current();

        _safeMint(account, newTokenId);
        // _safeMint(msg.sender, newTokenId);
        _idToNftItem[newTokenId].creator = account;
        _setTokenURI(newTokenId, tokenURI);
        _createNftItem(newTokenId, price, account);
        _usedTokenURIs[tokenURI] = true;
        _allNftsToken.push(newTokenId);
        return newTokenId;
    }

    function buyNft(uint256 tokenId, address payable _to) public payable {
        require(_to != address(0));

        address owner = ERC721.ownerOf(tokenId);

        require(_to != owner, "You already own this NFT");

        require(
            msg.value >= _idToNftItem[tokenId].price + listingPrice,
            "Please submit the asking price with fee price of 0.025 eth"
        );

        _listedItems.decrement();
        _owendNftsToken[owner]--;
        _owendNftsToken[_to]++;
        _idToNftItem[tokenId].isListed = false;
        uint256 buyingPrice = msg.value - listingPrice;
        (bool success, ) = owner.call{value: buyingPrice}("");
        require(success, "Failed to send buying price");

        _transfer(owner, _to, tokenId);
        _idToNftItem[tokenId].creator = payable(_to);

        (bool successs, ) = address(this).call{value: listingPrice}("");
        require(successs, "Failed to send listing price");
    }

    fallback() external payable {}

    // receive() external payable {}
    function placeNftOnSale(
        uint256 tokenId,
        address account,
        uint256 price
    ) public payable {
        require(account != address(0));
        require(
            ERC721.ownerOf(tokenId) == account,
            "You are not owner of this nft"
        );
        require(
            _idToNftItem[tokenId].isListed == false,
            "Item is already on sale"
        );
        (bool successs, ) = address(this).call{value: listingPrice}("");
        require(successs, "Failed to send listing price");
        _idToNftItem[tokenId].isListed = true;
        _idToNftItem[tokenId].price = price;
        _listedItems.increment();
    }

    function _createNftItem(
        uint256 tokenId,
        uint256 price,
        address account
    ) private {
        require(account != address(0));
        require(price > 0, "Price must be at least 1 wei");

        _idToNftItem[tokenId] = NftItem(tokenId, price, account, true);


        emit NftItemCreated(tokenId, price, account, true);
    }
    

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
