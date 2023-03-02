// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Counter{
    uint256 count;

    function increment()public {
        count++;
    }

    function decrement() public{
        require(count!=0,"Count cannot be a negetive number");
        count--;
    }

    function showCount() public view returns(uint256){
        return count;
    }
}