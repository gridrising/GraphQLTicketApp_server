const express = require("express");
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

const dbURI =
    "mongodb+srv://gridrising:zxcvb1234@toys.hzteg.mongodb.net/ticketsDB?retryWrites=true&w=majority";
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once("open", () => {
    console.log("connected to database");
})


app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(4000, () => {
    console.log("listening on port 4000")
})