const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLSchema } = require("graphql");
const client = require("../config/db");

const portCollection = client.db("Portfolio").collection("visitors");
const messageCollection = client.db("Portfolio").collection("message");

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

const VisitorType = new GraphQLObjectType({
  name: "Visitor",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    deviceType: { type: GraphQLString },
    browser: { type: GraphQLString },
    lastVisited: { type: GraphQLString },
    screenResolution: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    message: {
      type: new GraphQLList(MessageType),
      resolve: async () => {
        const result = await messageCollection
          .find()
          .sort({ id: -1 })
          .toarray();
        return result.map((msg) => ({
          id: msg._id.toString(),
          ...msg,
        }));
      },
    },
    visitors: {
      type: new GraphQLList(VisitorType),
      resolve: async () => {
        const result = await portCollection.find().sort({ _id: -1 }).toArray();
        return result.map((v) => ({
          id: v._id.toString(),
          ...v,
        }));
      },
    },
  },
});


// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMessage: {
      type: MessageType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, args) => {
        const result = await messageCollection.insertOne(args);
        return { id: result.insertedId.toString(), ...args };
      },
    },
    addVisitor: {
      type: VisitorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        deviceType: { type: new GraphQLNonNull(GraphQLString) },
        browser: { type: new GraphQLNonNull(GraphQLString) },
        lastVisited: { type: GraphQLString },
        screenResolution: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const result = await portCollection.insertOne(args);
        return { id: result.insertedId.toString(), ...args };
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});