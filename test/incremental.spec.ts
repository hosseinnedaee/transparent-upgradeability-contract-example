import { expect } from 'chai';
import { IncrementalV2__factory } from '../typechain-types';
import { admin, deployer, incremental, proxy, user } from './__setup.spec';

context('Generic', function () {
  context('Scenarois', function () {
    it('User should able to increment counter by one.', async function () {
      expect(await incremental.getCounter()).to.eq(0);

      await expect(incremental.increment()).not.to.be.reverted;

      expect(await incremental.getCounter()).to.eq(1);
    });

    it('Admin should be able to upgrade proxy to IncrementalV2, and so increment increase by 3.', async function () {
      const incrementalImplV2 = await new IncrementalV2__factory(deployer).deploy();
      const dataV2 = incrementalImplV2.interface.encodeFunctionData('initialize', [
        'INCREMENT_BY_3',
      ]);

      await proxy.connect(admin).upgradeToAndCall(incrementalImplV2.address, dataV2);

      const incrementall = IncrementalV2__factory.connect(proxy.address, user);

      expect(await incrementall.functionName()).to.eq('INCREMENT_BY_3');

      expect(await incrementall.getCounter()).to.eq(1);

      await expect(incrementall.increment()).to.be.not.reverted;

      expect(await incrementall.getCounter()).to.eq(4);
    });
  });
});
