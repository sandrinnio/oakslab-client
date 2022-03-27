import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

const uri = "http://localhost:4000/graphql";

const uploadLink: any = createUploadLink({
  uri,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log("TCL: errorLink -> message", message);

      console.log(
        `[GraphQL error]: Message: ${JSON.stringify(
          message
        )}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      );
    });

  if (networkError) {
    console.log("[Network error]:", networkError);
  }
});

const cache = new InMemoryCache({
  dataIdFromObject: (o) => o.id as string,
});

export default new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, uploadLink]) as any,
  connectToDevTools: true,
});
