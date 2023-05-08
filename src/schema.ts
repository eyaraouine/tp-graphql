import { createSchema } from "graphql-yoga";
import { Query } from "./Resolvers/QueryResolver";
import { user } from "./Resolvers/user";
import { cv } from "./Resolvers/cv";
import { skill } from "./Resolvers/skill";
import { Mutation } from "./Resolvers/Mutation";
import { Subscription } from "./Resolvers/Subscription";
const fs = require("fs");
const path = require("path");
export const schema = createSchema({
    typeDefs: fs.readFileSync(
        path.join(__dirname, "./schema.graphql"),
        "utf-8"
    ),
    resolvers: {
        Query,
        user,
        cv,
        skill,
        Mutation,
        Subscription
    },
});