// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0 <0.9.0;

// it should be considered a normal and healthy occurrence for a require() statement 
// to fail (same with revert()). When an assert() statement fails, something very wrong and 
// unexpected has happened,and you need to fix your code.


contract Lottery{
    address payable owner;
    address[] players;
    uint randNonce = 0;
    address public winner;

    constructor() {
        owner=payable(msg.sender);
    }

    modifier onlyOwner{
        require(msg.sender==owner,"You are not the owner");
        _;
    }

    function getPlayers() public view returns(address[] memory){
        return players;
    }

    function participate()public payable{
        if(msg.value<1 ether){
            revert("Send atleast 1 Ether to partiacipate");
        }
        players.push(msg.sender);
    }

    function pickWinner() onlyOwner payable public {
    randNonce++; 
    uint randomNumber=uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % players.length;
    assert(randomNumber<players.length);
    winner=players[randomNumber];
    (bool success, ) = payable(winner).call{value:address(this).balance}("");
    require(success, "Transfer failed.");
    }


}