import { updateTodo } from "@/graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export const updateFunction = async function(count: any): Promise<void> {
  const userId = localStorage.getItem("userId");
  console.log("useriddes", userId);
  await API.graphql(
    graphqlOperation(updateTodo, {
      input: {
        id: userId,
        count: count - 1,
      },
    })
  );
  location.href = "/tabs/tab1";
};
