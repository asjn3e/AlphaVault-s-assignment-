const SBETERC223 = artifacts.require("SBETERC223");

contract("SBETERC223", (accounts) => {
  const [owner, receiver, delegate] = accounts;
  const totalSupply = 1000000;
  const numTokens = 100;

  let sbet;

  beforeEach(async () => {
    sbet = await SBETERC223.new(totalSupply, { from: owner });
  });

  it("should return the correct total supply", async () => {
    const result = await sbet.totalSupply();
    assert.equal(result, totalSupply);
  });

  it("should return the correct balance for the owner", async () => {
    const result = await sbet.balanceOf(owner);
    assert.equal(result, totalSupply);
  });

  it("should transfer tokens between accounts", async () => {
    await sbet.transfer(receiver, numTokens, { from: owner });
    const ownerBalance = await sbet.balanceOf(owner);
    const receiverBalance = await sbet.balanceOf(receiver);

    assert.equal(ownerBalance, totalSupply - numTokens);
    assert.equal(receiverBalance, numTokens);
  });

  it("should emit a Transfer event when tokens are transferred", async () => {
    const result = await sbet.transfer(receiver, numTokens, { from: owner });
    const log = result.logs.find((log) => log.event === "Transfer");

    assert.equal(log.args.from, owner);
    assert.equal(log.args.to, receiver);
    assert.equal(log.args.tokens, numTokens);
  });

  it("should approve delegate to spend tokens", async () => {
    await sbet.approve(delegate, numTokens, { from: owner });
    const result = await sbet.allowance(owner, delegate);

    assert.equal(result, numTokens);
  });

  it("should transfer tokens from owner to buyer", async () => {
    await sbet.approve(delegate, numTokens, { from: owner });
    await sbet.transferFrom(owner, receiver, numTokens, { from: delegate });

    const ownerBalance = await sbet.balanceOf(owner);
    const receiverBalance = await sbet.balanceOf(receiver);

    assert.equal(ownerBalance, totalSupply - numTokens);
    assert.equal(receiverBalance, numTokens);
  });

  it("should emit a Transfer event when tokens are transferred from owner to buyer", async () => {
    await sbet.approve(delegate, numTokens, { from: owner });
    const result = await sbet.transferFrom(owner, receiver, numTokens, {
      from: delegate,
    });
    const log = result.logs.find((log) => log.event === "Transfer");

    assert.equal(log.args.from, owner);
    assert.equal(log.args.to, receiver);
    assert.equal(log.args.tokens, numTokens);
  });

  it("should decrease the allowance of the delegate after tokens are transferred from owner to buyer", async () => {
    await sbet.approve(delegate, numTokens, { from: owner });
    await sbet.transferFrom(owner, receiver, numTokens, { from: delegate });
    const result = await sbet.allowance(owner, delegate);

    assert.equal(result, 0);
  });
});
