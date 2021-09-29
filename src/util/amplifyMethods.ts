import { updateTodo } from "@/graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export const updateFunction = async function(
  count: any,
  amount: any
): Promise<void> {
  const userId = localStorage.getItem("userId");
  console.log("useriddes", userId);
  await API.graphql(
    graphqlOperation(updateTodo, {
      input: {
        id: userId,
        count: count - amount,
      },
    })
  );
  location.href = "/tabs/calling";
};
