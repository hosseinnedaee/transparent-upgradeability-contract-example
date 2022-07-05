// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import {Errors} from './libraries/Errors.sol';
import {VersionInitializable} from './upgradeability/VersionInitializable.sol';

contract Incremental is VersionInitializable {
    uint256 internal constant REVISION = 1;

    string public functionName;

    uint256 public counter = 0;

    function initialize(string calldata name) external initializer {
        functionName = name;
    }

    function increment() external {
        counter++;
    }

    function getCounter() external view returns (uint256) {
        return counter;
    }

    function getRevision() internal pure override returns (uint256) {
        return REVISION;
    }
}
