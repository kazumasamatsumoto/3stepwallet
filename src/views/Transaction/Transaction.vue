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
  Deadline,
  PlainMessage,
  RepositoryFactoryHttp,
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
      const nodeUrl = "http://sym-test-01.opening-line.jp:3000";
      const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
      const epochAdjustment = await repositoryFactory
        .getEpochAdjustment()
        .toPromise();
      const networkType = await repositoryFactory.getNetworkType().toPromise();
      const networkGenerationHash = await repositoryFactory
        .getGenerationHash()
        .toPromise();
      const { currency } = await repositoryFactory.getCurrencies().toPromise();

      const rawAddress = "TBUKFL-3BMEXY-BDQYBV-5Y7UOW-NRM3TD-RZ4PNF-CZQ";
      const recipientAddress = Address.createFromRawAddress(rawAddress);

      const transferTransaction = TransferTransaction.create(
        Deadline.create(epochAdjustment),
        recipientAddress,
        [currency.createRelative(10)],
        PlainMessage.create("This is a test message"),
        networkType,
        UInt64.fromUint(2000000)
      );

      const privateKey =
        "015591B6B39D534173CA123546C4FFB2986B0F3996F056DB601C2A63F504F87E";
      const account = Account.createFromPrivateKey(privateKey, networkType);
      const signedTransaction = account.sign(
        transferTransaction,
        networkGenerationHash
      );
      console.log("Payload:", signedTransaction.payload);
      console.log("Transaction Hash:", signedTransaction.hash);

      const transactionRepository = repositoryFactory.createTransactionRepository();
      const response = await transactionRepository
        .announce(signedTransaction)
        .toPromise();
      console.log(response);
    }
  }
};
</script>
