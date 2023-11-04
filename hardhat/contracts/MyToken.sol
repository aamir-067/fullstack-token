// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor()
        ERC20("MyToken", "MTK")
    {
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }

    function decimals() public view virtual override returns(uint8){
        return 3;
    }
    
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}