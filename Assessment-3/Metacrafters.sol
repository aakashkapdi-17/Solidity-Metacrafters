// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract MyToken{

    string public tokenName;
    string public tokenSymbol;
    uint256 public noOfTokens;
    address public owner;

    mapping(address=>uint256) tokenMap;


    constructor(string memory _tokenName,string memory _tokenSymbol){
        owner=msg.sender;
        tokenName=_tokenName;
        tokenSymbol=_tokenSymbol;
        noOfTokens=0;
    }

    modifier onlyOwner{
        require(msg.sender==owner,"You are not the owner of the contract");
        _;
    }

    function mint(address _to,uint256 _noOfTokens) public onlyOwner{
        require(_to!=address(0),"Invalid Address");
        noOfTokens=noOfTokens+_noOfTokens;
        tokenMap[_to]=tokenMap[_to]+_noOfTokens;
    }

    function balanceOf(address _to) public view returns(uint256) {
        return tokenMap[_to];
    }

    function transfer(address _to,uint256 _noOfTokens) public {
        require(tokenMap[msg.sender]-_noOfTokens>=0,"You dont have tokens");
        require(msg.sender!=_to,"You cant transfer tokens to yourself");
        tokenMap[msg.sender]=tokenMap[msg.sender]-_noOfTokens;
        tokenMap[_to]=tokenMap[_to]+_noOfTokens;
    }

}