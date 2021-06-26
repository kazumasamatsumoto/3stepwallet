<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>トランザクション履歴</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button @click="testCosign">承認テスト</ion-button>
      <ion-label> 未承認トランザクション </ion-label>
      <ul id="example-1" style="list-style: none;">
        <li v-for="item in sample" :key="item.transactionInfo.hash">
          <ion-card>
            <ion-card-content>
              type: {{ item.type }} <br />
              version: {{ item.version }} <br />
              transactionHash: {{ item.transactionInfo.hash }} <br />
            </ion-card-content>
            <ion-button @click="presentAlert(item)">Show Alert</ion-button>
          </ion-card>
        </li>
      </ul>
      <ion-label> 承認済みトランザクション </ion-label>
      <ul id="example-1" style="list-style: none;">
        <li v-for="item in confirmtransaction" :key="item.transactionInfo.hash">
          <ion-card>
            <ion-card-content>
              type: {{ item.type }} <br />
              version: {{ item.version }} <br />
              transactionHash: {{ item.transactionInfo.hash }} <br />
            </ion-card-content>
          </ion-card>
        </li>
      </ul>
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
    IonCard,
    IonCardContent,
    alertController,
    IonButton,
  } from "@ionic/vue";
  import {
    getTransactionList,
    getUnConfirmTransactionList,
  } from "@/util/symbol";
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

  export default {
    name: "Tab2",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonLabel,
      IonCard,
      IonCardContent,
      IonButton,
    },
    data: function() {
      return {
        confirmtransaction: "",
        sample: "",
      };
    },
    async created(this: {
      confirmtransaction: Array<any>;
      sample: Array<any>;
    }) {
      const test = await getTransactionList();
      if (test !== undefined) {
        this.confirmtransaction = test;
      }
      const test2 = await getUnConfirmTransactionList();
      if (test2 !== undefined) {
        this.sample = test2;
      }
    },
    methods: {
      async presentAlert(item: any) {
        const alert = await alertController.create({
          cssClass: "my-custom-class",
          header: "Alert",
          subHeader: "Subtitle",
          message: item.transactionInfo.hash,
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {
                console.log("Confirm Cancel");
              },
            },
            {
              text: "OK",
              handler: () => {
                this.testCosign(item.transactionInfo.hash);
              },
            },
          ],
        });
        return alert.present();
      },
      testCosign(hash: string) {
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
      },
    },
  };
</script>

<style>
  ul,
  ol {
    padding: 0;
    position: relative;
  }
</style>
