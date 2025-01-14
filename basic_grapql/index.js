const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    name: String
    age: Int
    position: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(name: String, age: Int, position: String): User
  }
`;

let users = [
  {
    name: "John",
    age: 25,
    position: "Developer",
  },
  {
    name: "Jane",
    age: 30,
    position: "Designer",
  },
  {
    name: "Bob",
    age: 35,
    position: "Manager",
  },
];

const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    createUser(parent, args) {
      const newUser = args;
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
