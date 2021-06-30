import {
  Account,
  Address,
  AggregateTransaction,
  Deadline,
  HashLockTransaction,
  Mosaic,
  MosaicId,
  PlainMessage,
  PublicAccount,
  RepositoryFactoryHttp,
  TransactionService,
  TransferTransaction,
  UInt64,
  TransactionGroup,
} from "symbol-sdk";

export const multisigTransaction = async function(): Promise<void> {
  try {
    console.log(process.env.VUE_APP_WEB_SOCKET_URL);
    const nodeUrl = process.env.VUE_APP_WEB_SOCKET_URL;
    const cosignatoryPrivateKey = process.env.VUE_APP_COSIGN_PRIVATE_KEY;
    const multisigAccountPublicKey =
      process.env.VUE_APP_MULTISIG_ACCOUNT_PUBLICKEY;
    const recipientRawAddress = process.env.VUE_APP_RECIPIENT_RAW_ADDRESS;
    const mosaicId = process.env.VUE_APP_MOSAICID;
    if (
      nodeUrl &&
      cosignatoryPrivateKey &&
      multisigAccountPublicKey &&
      recipientRawAddress &&
      mosaicId
    ) {
      const repositoryFactory = new RepositoryFactoryHttp(nodeUrl, {
        websocketUrl: nodeUrl.replace("http", "ws") + "/ws",
        websocketInjected: WebSocket,
      });
      const epochAdjustment = await repositoryFactory
        .getEpochAdjustment()
        .toPromise();
      const networkType = await repositoryFactory.getNetworkType().toPromise();
      const networkGenerationHash = await repositoryFactory
        .getGenerationHash()
        .toPromise();

      console.log(networkType, networkGenerationHash);

      // replace with cosignatory private key

      const cosignatoryAccount = Account.createFromPrivateKey(
        cosignatoryPrivateKey,
        networkType
      );
      console.log(cosignatoryAccount, "署名者のアカウント");
      // replace with multisig account public key

      const multisigAccount = PublicAccount.createFromPublicKey(
        multisigAccountPublicKey,
        networkType
      );
      console.log(multisigAccount, "マルチシグのアカウント");
      // replace with recipient address

      const recipientAddress = Address.createFromRawAddress(
        recipientRawAddress
      );
      // replace with symbol.xym id
      const networkCurrencyMosaicId = new MosaicId(mosaicId);
      // replace with network currency divisibility
      const networkCurrencyDivisibility = 6;

      const transferTransaction = TransferTransaction.create(
        Deadline.create(epochAdjustment),
        recipientAddress,
        [
          new Mosaic(
            networkCurrencyMosaicId,
            UInt64.fromUint(10 * Math.pow(10, networkCurrencyDivisibility))
          ),
        ],
        PlainMessage.create("sending 10 symbol.xym"),
        networkType
      );
      /* start block 01 */
      const aggregateTransaction = AggregateTransaction.createBonded(
        Deadline.create(epochAdjustment),
        [transferTransaction.toAggregate(multisigAccount)],
        networkType,
        [],
        UInt64.fromUint(2000000)
      );
      // replace with meta.networkGenerationHash (nodeUrl + '/node/info')
      const signedTransaction = cosignatoryAccount.sign(
        aggregateTransaction,
        networkGenerationHash
      );
      console.log(signedTransaction.hash);
      const hashLockTransaction = HashLockTransaction.create(
        Deadline.create(epochAdjustment),
        new Mosaic(
          networkCurrencyMosaicId,
          UInt64.fromUint(10 * Math.pow(10, networkCurrencyDivisibility))
        ),
        UInt64.fromUint(480),
        signedTransaction,
        networkType,
        UInt64.fromUint(2000000)
      );
      const signedHashLockTransaction = cosignatoryAccount.sign(
        hashLockTransaction,
        networkGenerationHash
      );
      // replace with node endpoint
      const listener = repositoryFactory.createListener();
      const receiptHttp = repositoryFactory.createReceiptRepository();
      const transactionHttp = repositoryFactory.createTransactionRepository();
      const transactionService = new TransactionService(
        transactionHttp,
        receiptHttp
      );
      listener.open().then(() => {
        transactionService
          .announceHashLockAggregateBonded(
            signedHashLockTransaction,
            signedTransaction,
            listener
          )
          .subscribe(
            (x) => console.log(x),
            (err) => console.log(err),
            () => listener.close()
          );
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionList = async () => {
  try {
    const rawAddress = "TBUKFL3BMEXYBDQYBV5Y7UOWNRM3TDRZ4PNFCZQ";
    const address = Address.createFromRawAddress(rawAddress);
    /* end block 01 */

    /* start block 02 */
    // replace with node endpoint
    const nodeUrl = process.env.VUE_APP_WEB_SOCKET_URL;
    if (nodeUrl) {
      const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
      const transactionHttp = repositoryFactory.createTransactionRepository();

      const searchCriteria = {
        group: TransactionGroup.Confirmed,
        address,
        pageNumber: 1,
        pageSize: 100,
      };
      const transactionInfo = [];
      const page = await transactionHttp.search(searchCriteria).toPromise();
      for (let i = 0; i < page.data.length; i++) {
        if (page.data[i] instanceof AggregateTransaction) {
          const txHash = page.data[i].transactionInfo?.hash as string;
          const test = (await transactionHttp
            .getTransaction(txHash, TransactionGroup.Confirmed)
            .toPromise()) as AggregateTransaction;
          const sample = test.innerTransactions[0] as TransferTransaction;
          console.log(sample, `${i}番目`);
          transactionInfo.push(sample);
        }
      }
      return transactionInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUnConfirmTransactionList = async () => {
  try {
    const rawAddress = "TBHZV7LHG4PIM5GJS6QPFHLR47IRTP5I6USRN3Y";
    const address = Address.createFromRawAddress(rawAddress);
    /* end block 01 */
    /* start block 02 */
    // replace with node endpoint
    const nodeUrl = process.env.VUE_APP_WEB_SOCKET_URL;
    if (nodeUrl) {
      const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
      const transactionHttp = repositoryFactory.createTransactionRepository();
      const searchCriteria = {
        group: TransactionGroup.Partial,
        address,
        pageNumber: 1,
        pageSize: 100,
      };
      const page2 = await transactionHttp.search(searchCriteria).toPromise();
      return page2.data;
    }
  } catch (error) {
    console.log(error);
  }
};
