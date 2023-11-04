// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
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
