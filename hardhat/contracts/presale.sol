// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IERC20CUSTOM.sol";
contract PreSale{
    // for fetching the eth price in usd.
    AggregatorV3Interface internal dataFeed;

    uint public totalSoldAmount;
    uint public currentRate = 0.00001 ether;
    address public mytoken;
    address public owner;
    event tokenSold( address indexed, uint indexed);
    event priceChange(uint);
    constructor(address _token){
        mytoken = _token;   

        owner = msg.sender;
        dataFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
    }
    
    function purchaseTokens(uint tokens) public  payable{
        require(msg.value >= ((tokens / 1000) * currentRate), "not enough money to purchase tokens");  // 10 ** IERC20(mytoken).decimals() == 1000
        require((totalSoldAmount + tokens <= (80000000 * 1000)), "token already sold");    // 1000 == IERC20(mytoken).decimals()

        
        totalSoldAmount += tokens;
        if(((totalSoldAmount/1000) > 1000000) && currentRate != 0.00005 ether){  // sold more then 10M token which means change price to mormal.
            currentRate = 0.00005 ether;
        }

        IERC20CUSTOM(mytoken).mint(msg.sender,tokens);

        emit tokenSold(msg.sender, tokens/1000);
    }   

    function getTokenPriceInUSD() public view returns(int){
        (,int answer,,,) = dataFeed.latestRoundData();
        return answer;
    }

    function getTokenPriceInEth() public view returns(uint){
        return currentRate;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function changePrice(uint newPrice) public onlyOwner {
        currentRate = newPrice;
        emit priceChange(newPrice);
    } 
    function getAllBalance() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}