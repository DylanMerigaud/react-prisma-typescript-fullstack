import { prisma } from "./generated/prisma-client";
import datamodelInfo from "./generated/nexus-prisma";
import * as path from "path";
import { arg, stringArg, idArg, enumType } from "nexus";
import { prismaObjectType, makePrismaSchema } from "nexus-prisma";
import { GraphQLServer } from "graphql-yoga";
import { rule, shield } from "graphql-shield";
import * as yup from "yup";
import { ContextParameters } from "graphql-yoga/dist/types";

const Query = prismaObjectType({
  name: "Query",
  definition: t => {
    t.prismaFields(["post"]);
    t.list.field("feed", {
      type: "Post",
      resolve: (_, args, ctx) =>
        ctx.prisma.posts({ where: { published: true } })
    });
    t.list.field("postsByUser", {
      type: "Post",
      args: { email: stringArg() },
      resolve: (_, { email }, ctx) =>
        ctx.prisma.posts({ where: { author: { email } } })
    });
  }
});

const Mutation = prismaObjectType({
  name: "Mutation",
  definition: t => {
    t.prismaFields(["createUser", "deletePost"]);
    t.field("createDraft", {
      type: "Post",
      args: {
        title: stringArg(),
        authorId: idArg({ nullable: true })
      },
      resolve: (_, { title, authorId }, ctx) =>
        ctx.prisma.createPost({
          title,
          author: { connect: { id: authorId } }
        })
    });
    t.field("publish", {
      type: "Post",
      nullable: true,
      args: { id: idArg() },
      resolve: (_, { id }, ctx) =>
        ctx.prisma.updatePost({
          where: { id },
          data: { published: true }
        })
    });
    t.field("testoss", {
      type: "Test",
      args: {
        aliment: arg({
          type: "Aliment"
        })
      },
      resolve: (_, { aliment }, ctx) => {
        console.log("aliment: " + aliment);
        AlimentYupSchema.validateSync(aliment);
        return {
          id: "",
          lol: aliment
        };
      }
    });
  }
});

const AlimentYupSchema = yup.mixed().oneOf(["Poulet", "Frites"]);

const Aliment = enumType({
  name: "Aliment",
  members: ["Poulet", "Frites", "Error"],
  description: "A boufer !"
});

const schema = makePrismaSchema({
  types: [Query, Mutation, Aliment],
  prisma: {
    datamodelInfo,
    client: prisma
  },
  outputs: {
    schema: path.join(__dirname, "./generated/schema.graphql"),
    typegen: path.join(__dirname, "./generated/nexus.ts")
  }
});

function getUser(req: ContextParameters) {
  const auth = req.request.get("Authorization");
  if (auth === "admin") {
    return { role: "admin" };
  } else if (auth) {
    return { role: "user" };
  } else {
    return null;
  }
}

// Rules

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  return ctx.user !== null;
});

const isAdmin = rule()(async (parent, args, ctx, info) => {
  return ctx.user.role === "admin";
});

const isUser = rule()(async (parent, args, ctx, info) => {
  return ctx.user.role === "user";
});

// Permissions

const permissions = shield({
  Query: {},
  Mutation: {
    testoss: isAuthenticated
  },
  Test: isAdmin,
  Aliment: isAuthenticated
});

const server = new GraphQLServer({
  schema,
  context: (req: ContextParameters) => ({
    ...req,
    user: getUser(req),
    prisma
  }),
  middlewares: [permissions]
});
server.start(() => console.log("Server is running on http://localhost:4000"));
