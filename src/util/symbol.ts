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
  Transaction,
} from "symbol-sdk";

export const multisigTransaction = async function(): Promise<void> {
  try {
    console.log(process.env.VUE_APP_WEB_SOCKET_URL);
    const nodeUrl = process.env.VUE_APP_WEB_SOCKET_URL;
    const repositoryFactory = new RepositoryFactoryHttp(nodeUrl, {
      websocketUrl: "ws://ngl-dual-601.testnet.symboldev.network:3000/ws",
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
    const cosignatoryPrivateKey = process.env.VUE_APP_COSIGN_PRIVATE_KEY;
    const cosignatoryAccount = Account.createFromPrivateKey(
      cosignatoryPrivateKey,
      networkType
    );
    console.log(cosignatoryAccount, "署名者のアカウント");
    // replace with multisig account public key
    const multisigAccountPublicKey =
      process.env.VUE_APP_MULTISIG_ACCOUNT_PUBLICKEY;
    const multisigAccount = PublicAccount.createFromPublicKey(
      multisigAccountPublicKey,
      networkType
    );
    console.log(multisigAccount, "マルチシグのアカウント");
    // replace with recipient address
    const recipientRawAddress = process.env.VUE_APP_RECIPIENT_RAW_ADDRESS;
    const recipientAddress = Address.createFromRawAddress(recipientRawAddress);
    // replace with symbol.xym id
    const networkCurrencyMosaicId = new MosaicId(process.env.VUE_APP_MOSAICID);
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
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionList = async function() {
  try {
    const rawAddress = "TBHZV7LHG4PIM5GJS6QPFHLR47IRTP5I6USRN3Y";
    const address = Address.createFromRawAddress(rawAddress);
    /* end block 01 */

    /* start block 02 */
    // replace with node endpoint
    const nodeUrl = process.env.VUE_APP_WEB_SOCKET_URL;
    const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
    const transactionHttp = repositoryFactory.createTransactionRepository();

    const searchCriteria = {
      group: TransactionGroup.Confirmed,
      address,
      pageNumber: 1,
      pageSize: 100,
    };
    transactionHttp.search(searchCriteria).subscribe(
      async (page) => console.log("承認", page.data),
      (err) => console.error(err)
    );
  } catch (error) {
    console.log(error);
  }
};

export const getUnConfirmTransactionList = async function() {
  try {
    const rawAddress = "TBHZV7LHG4PIM5GJS6QPFHLR47IRTP5I6USRN3Y";
    const address = Address.createFromRawAddress(rawAddress);
    /* end block 01 */

    /* start block 02 */
    // replace with node endpoint
    const nodeUrl = process.env.VUE_APP_WEB_SOCKET_URL;
    const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
    const transactionHttp = repositoryFactory.createTransactionRepository();
    let sample: Transaction[];

    const searchCriteria = {
      group: TransactionGroup.Partial,
      address,
      pageNumber: 1,
      pageSize: 100,
    };
    transactionHttp.search(searchCriteria).subscribe(
      async (page) => {
        console.log("未承認", page.data);
        sample = page.data;
        return sample;
      },
      (err) => console.error(err)
    );
  } catch (error) {
    console.log(error);
  }
};
