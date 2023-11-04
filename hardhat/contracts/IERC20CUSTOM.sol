interface IERC20CUSTOM{
    /**
     * @dev Addeed by the developer.
     * This function returns the decimals of the token.
     */
    function decimals() public view virtual returns (uint8);


     /**
     * @dev Addeed by the developer.
     * This function mint new tokens.
     */
    function mint(address to, uint amount) public;
}
