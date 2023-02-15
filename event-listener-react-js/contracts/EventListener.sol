// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// To do this:

// Write a smart contract that defines and triggers 3-4 events
// Index the events so that they can be easily searched
// Capture these events in your JavaScript code


contract EventListener{

    event Call(address indexed caller,string message);
    function add(uint8 var1,uint8 var2) public returns(uint16){
        emit Call(msg.sender,"Addition Called");
        return var1+var2;
    }
    function subtract(uint8 var1,uint8 var2) public returns(uint8){
        if(var1<var2){
            uint8 temp=var1;
            var1=var2;
            var2=temp;
        }
                emit Call(msg.sender,"Subtraction Called");
        return var1-var2;
    }
    function multiply(uint8 var1,uint8 var2) public returns(uint16){
                emit Call(msg.sender,"Multiplication Called");
        return var1*var2;
    }
    function divide(uint8 var1,uint8 var2) public returns(uint8){
                emit Call(msg.sender,"Division Called");
        require(var2 !=0,"Zero division error");
        
        return var1/var2;
    }
}