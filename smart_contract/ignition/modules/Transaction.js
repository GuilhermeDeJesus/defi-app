// deploy.js
import { buildModule } from "@nomicfoundation/ignition-core";

export default buildModule("TransactionsModule", (m) => {
  const transactionContract = m.contract("Transactions");
  m.contract

  console.log(transactionContract);
  return { transactionContract };
});
