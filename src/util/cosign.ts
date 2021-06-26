import { map, mergeMap } from "rxjs/operators";
import {
  Account,
  AggregateTransaction,
  CosignatureSignedTransaction,
  CosignatureTransaction,
  NetworkType,
  RepositoryFactoryHttp,
  TransactionGroup,
} from "symbol-sdk";

const cosignAggregateBondedTransaction = (
  transaction: AggregateTransaction,
  account: Account
): CosignatureSignedTransaction => {
  const cosignatureTransaction = CosignatureTransaction.create(transaction);
  return account.signCosignatureTransaction(cosignatureTransaction);
};

export const testCosign = function(hash: string) {
  console.log("testCosign");
  const networkType = NetworkType.TEST_NET;
  // replace with private key
  const privateKey =
    "72D29CA347E87A7C4205D90BE51A800931D87402DF34A1FB5BD533BBC623E1A9";
  const account = Account.createFromPrivateKey(privateKey, networkType);
  // replace with node endpoint
  // replace with transaction hash to cosign
  const transactionHash = hash;
  /* end block 02 */

  /* start block 03 */
  const nodeUrl = process.env.VUE_APP_WEB_SOCKET_URL;
  const repositoryFactory = new RepositoryFactoryHttp(nodeUrl, {
    websocketUrl: "ws://ngl-dual-601.testnet.symboldev.network:3000/ws",
    websocketInjected: WebSocket,
  });
  const transactionHttp = repositoryFactory.createTransactionRepository();

  transactionHttp
    .getTransaction(transactionHash, TransactionGroup.Partial)
    .pipe(
      map((transaction) =>
        cosignAggregateBondedTransaction(
          transaction as AggregateTransaction,
          account
        )
      ),
      mergeMap((cosignatureSignedTransaction) =>
        transactionHttp.announceAggregateBondedCosignature(
          cosignatureSignedTransaction
        )
      )
    )
    .subscribe(
      (announcedTransaction) => console.log(announcedTransaction),
      (err) => console.error(err)
    );
};
