// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import {Errors} from '../libraries/Errors.sol';

abstract contract VersionInitializable {
    address private immutable originalImpl;

    uint256 private lastInitializedRevision = 0;

    modifier initializer() {
        uint256 revision = getRevision();
        if (address(this) == originalImpl) revert Errors.CannotInitImplementation();
        if (revision <= lastInitializedRevision) revert Errors.Initialized();
        lastInitializedRevision = revision;
        _;
    }

    constructor() {
        originalImpl = address(this);
    }

    function getRevision() internal pure virtual returns (uint256);
}
