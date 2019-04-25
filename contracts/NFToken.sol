pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
// import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';


contract NFToken is ERC721Full, Ownable {

  /*** EVENTS ***/
  /// The event emitted (useable by web3) when a token is purchased
  event BoughtToken(address indexed buyer, uint256 tokenId);

  /*** CONSTANTS ***/
  uint8 constant TITLE_MIN_LENGTH = 1;
  uint8 constant TITLE_MAX_LENGTH = 64;

  /*** DATA TYPES ***/

  /// Price set by contract owner for each token in Wei.
  uint256 currentPrice = 3000000000000000;

  /// The token type (e.g. 1 for shield, 2 for sword)
  mapping(uint256 => uint256) tokenTypes;

  /// The title of the token
  mapping(uint256 => string) tokenTitles;

  // TODO: Add a new token characteristic of Score

  // TODO: Choose a token symbol!
  constructor() ERC721Full("Tutorial NFT", "UWI") public {
    // any init code when you deploy the contract would run here
  }

  /// Requires the amount of Ether be at least or more of the currentPrice
  /// @dev Creates an instance of an token and mints it to the purchaser
  // / @param _type The token type as an integer
  /// @param _title The short title of the token
  function buyToken (
    // uint256 _type,
    string calldata _title
  ) external payable {
    bytes memory _titleBytes = bytes(_title);
    require(_titleBytes.length >= TITLE_MIN_LENGTH, "Title is too short");
    require(_titleBytes.length <= TITLE_MAX_LENGTH, "Title is too long");

    // TODO: Check that the _type is valid

    // TODO: Check that the correct price has been sent

    
    uint256 index = totalSupply().add(1);
    _mint(msg.sender, index);

    // TODO: Store some details about the token (type, title, score)
    tokenTitles[index] = _title;

    // TODO: Emit an event so the dApp can react to the purchase
  }

  /**
   * @dev Returns all of the tokens that the user owns
   * @return An array of token indices
   */
  function myTokens()
    external
    view
    returns (
      uint256
    )
  {
    return balanceOf(msg.sender);
  }

  /// @notice Returns all the relevant information about a specific token
  /// @param _tokenId The ID of the token of interest
  function getToken(uint256 _tokenId)
    external
    view
    returns (
      uint256 tokenType_,
      string memory tokenTitle_
  ) {
      // TODO: Add Token Score to the details returned
      tokenType_ = tokenTypes[_tokenId];
      tokenTitle_ = tokenTitles[_tokenId];
  }

  /// @notice Allows the owner of this contract to set the currentPrice for each token
  function setCurrentPrice(uint256 newPrice)
    public
    onlyOwner
  {
      currentPrice = newPrice;
  }

  /// @notice Returns the currentPrice for each token
  function getCurrentPrice()
    external
    view
    returns (
    uint256 price
  ) {
      // TODO: Make the price increase over time - encourage FOMO ;-)
      price = currentPrice;
  }

}
