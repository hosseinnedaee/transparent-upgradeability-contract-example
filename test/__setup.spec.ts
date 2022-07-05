import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { use } from 'chai';
import { solidity } from 'ethereum-waffle';
import {
  Incremental,
  Incremental__factory,
  TransparentUpgradeableProxy__factory,
  TransparentUpgradeableProxy,
} from '../typechain-types';

use(solidity);

export let accounts: Signer[];
export let deployer: Signer;
export let user: Signer;
export let admin: Signer;
export let adminAddress: string;
export let userAddress: string;
export let incrementalImplV1: Incremental;
export let incremental: Incremental;
export let proxy: TransparentUpgradeableProxy;

before(async function () {
  accounts = await ethers.getSigners();
  deployer = accounts[0];
  user = accounts[1];
  admin = accounts[0];
  adminAddress = await admin.getAddress();
  userAddress = await user.getAddress();

  incrementalImplV1 = await new Incremental__factory(deployer).deploy();

  const dataV1 = incrementalImplV1.interface.encodeFunctionData('initialize', ['INCREMENT_BY_ONE']);

  proxy = await new TransparentUpgradeableProxy__factory(deployer).deploy(
    incrementalImplV1.address,
    adminAddress,
    dataV1
  );

  incremental = Incremental__factory.connect(proxy.address, user);
});
