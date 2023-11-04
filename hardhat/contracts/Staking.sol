// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
interface IERC20CUSTOM{
    /**
     * @dev Addeed by the developer.
     * This function returns the decimals of the token.
     */
    function decimals() external view returns (uint8);


     /**
     * @dev Addeed by the developer.
     * This function mint new tokens.
     */
    function mint(address to, uint amount) external;
}

contract Stacking{
    struct Record{
        uint amount;
        uint time;
    }

    constructor(address token){
        mytoken = token;
    }

    mapping (address => Record) public stackers;
    address mytoken;
    event tokenStacked(uint);
    event tokenUnStacked(uint, uint);


    function stackToken(uint amount) public {
        require(amount >= 50 * 1000 , "minimum 50 token to stack");
        require(IERC20(mytoken).totalSupply() < (80000000 * 1000), "max supply reached cant stack anymore");
        // check allownce
        require(IERC20(mytoken).allowance(msg.sender, address(this)) >= amount , "you did not allow the contract to stack the token");

        IERC20(mytoken).transferFrom(msg.sender , address(this), amount);

        // save the records.
        Record storage temp = stackers[msg.sender];
        temp.amount += amount;

        if(temp.time > 0){
            temp.time =(temp.time + block.timestamp) /2;
        }else{
            temp.time = block.timestamp;
        }
        
        emit tokenStacked(amount);
    }

    function unStackToken(uint amount) public{
        require(amount >= 0, "tokens must be greater than 0");
        Record storage temp = stackers[msg.sender];
        require(temp.amount >= amount, "you dont have enough token to unstack");

        uint reward = calculateReward(amount, temp);
        IERC20CUSTOM(mytoken).mint(msg.sender, reward);  // sent reward
        IERC20(mytoken).transfer(msg.sender, amount);

        // decrement the token from its account in stackers
        temp.amount -= amount;

        emit tokenUnStacked(amount, reward);
    }

    function calculateReward(uint amount, Record memory history) internal view returns(uint){
        // formula is 5% daily of the total amount . calculated on the amount which is withdrawen at time of withdraw.
        uint x = (amount * 5)/100; 
        uint y = (block.timestamp - history.time) / (3600*24);
        uint reward = x * y;
        return reward;
    }
}