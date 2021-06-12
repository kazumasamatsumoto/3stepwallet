<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>トランザクションページ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-label>
        トランザクションページ
      </ion-label>
      <ion-button @click="testFunction">送信</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonButton
} from "@ionic/vue";
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
  UInt64
} from "symbol-sdk";

export default {
  name: "Tab1",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonContent,
    IonLabel,
    IonButton
  },
  methods: {
    sampleFunction: function() {
      console.log("test");
    },

    testFunction: async function(): Promise<void> {
      try {
        const nodeUrl = "http://ngl-dual-601.testnet.symboldev.network:3000";
        const repositoryFactory = new RepositoryFactoryHttp(nodeUrl, {
          websocketUrl: "ws://ngl-dual-601.testnet.symboldev.network:3000/ws",
          websocketInjected: WebSocket
        });
        const epochAdjustment = await repositoryFactory
          .getEpochAdjustment()
          .toPromise();
        const networkType = await repositoryFactory
          .getNetworkType()
          .toPromise();
        const networkGenerationHash = await repositoryFactory
          .getGenerationHash()
          .toPromise();

        console.log(networkType, networkGenerationHash);

        // replace with cosignatory private key
        const cosignatoryPrivateKey =
          "2F8F16D66BD2CC8774B509A1D1A57718CD6F205C04918C5A9FB91A8A2B673088";
        const cosignatoryAccount = Account.createFromPrivateKey(
          cosignatoryPrivateKey,
          networkType
        );
        console.log(cosignatoryAccount, "署名者のアカウント");
        // replace with multisig account public key
        const multisigAccountPublicKey =
          "A8241EDA0FF5BABB607B19D5BDB9FA383166E7AEB61E7D4DDA11F3E4370E7325";
        const multisigAccount = PublicAccount.createFromPublicKey(
          multisigAccountPublicKey,
          networkType
        );
        console.log(multisigAccount, "マルチシグのアカウント");
        // replace with recipient address
        const recipientRawAddress =
          "TBUKFL-3BMEXY-BDQYBV-5Y7UOW-NRM3TD-RZ4PNF-CZQ";
        const recipientAddress = Address.createFromRawAddress(
          recipientRawAddress
        );
        // replace with symbol.xym id
        const networkCurrencyMosaicId = new MosaicId("091F837E059AE13C");
        // replace with network currency divisibility
        const networkCurrencyDivisibility = 6;

        const transferTransaction = TransferTransaction.create(
          Deadline.create(epochAdjustment),
          recipientAddress,
          [
            new Mosaic(
              networkCurrencyMosaicId,
              UInt64.fromUint(10 * Math.pow(10, networkCurrencyDivisibility))
            )
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
              x => console.log(x),
              err => console.log(err),
              () => listener.close()
            );
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
