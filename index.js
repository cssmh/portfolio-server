const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const app = express();
const welcome = require("./welcome");
const portRoutes = require("./routes/Routes");
require("dotenv").config();
const port = process.env.PORT;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://momin-hossain.vercel.app",
      "https://momin-hossain.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(portRoutes);
app.use(welcome);

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // GraphiQL playground enabled
  })
);

app.listen(port, () => {
  console.log(
    `🚀 Portfolio is running at: \x1b[36mhttp://localhost:${port}\x1b[0m`
  );
});