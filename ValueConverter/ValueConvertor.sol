// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract ValueConverter{

    uint256 value;


    function receiveValue() payable public{
        value=msg.value;
    }

    function returnValue() public view returns(uint256){
        return value;
    }

    function convertToWei()public view returns(uint){
        return value* 1 wei;
    }

    function convertToEth()public view returns(uint){
        return value/1 ether;
    }

    function convertToGwei()public view returns(uint){
        return value/1 gwei;
    }

}