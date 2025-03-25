require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/zCPVqT3ujBwN7Ua-K7LDTyZHgyS1kpU_",

      // Chave Privada da Carteira de Teste do Metamask
      // Propósito Principal - Assina transações na blockchain (como seu deploy de contrato)
      accounts: ["99df732c12da3c7925999ab95cdbdec7404208443d282a8cf0539ff5d263b20d"]
    }
  }
};
