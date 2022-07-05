// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import {Errors} from './libraries/Errors.sol';
import {VersionInitializable} from './upgradeability/VersionInitializable.sol';

contract IncrementalV2 is VersionInitializable {
    uint256 internal constant REVISION = 2;

    string public functionName;

    uint256 public counter = 0;

    uint256 internal constant byNumber = 3;

    function initialize(string calldata name) external initializer {
        functionName = name;
    }

    function increment() external {
        counter = counter + byNumber;
    }

    function getCounter() external view returns (uint256) {
        return counter;
    }

    function getRevision() internal pure override returns (uint256) {
        return REVISION;
    }
}
