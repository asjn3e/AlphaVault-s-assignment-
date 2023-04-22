export const requestAccounts = async () => {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (error) {
    console.error(error);
  }
};
