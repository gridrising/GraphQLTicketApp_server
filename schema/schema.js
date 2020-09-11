const graphql = require("graphql");
const _ = require("lodash");
const Ticket = require("../models/ticket");
const Owner = require("../models/owner");
const Asset = require("../models/asset");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLFloat, GraphQLList, GraphQLNonNull } = graphql;
const { GraphQLDateTime } = require("graphql-iso-date");

const TicketType = new GraphQLObjectType({
    name: "Ticket",
    fields: () => ({
        id: { type: GraphQLID },
        number: { type: GraphQLString },
        status: { type: GraphQLString },
        description: { type: GraphQLString },
        lastUpdated: { type: GraphQLDateTime },
        reportedTime: { type: GraphQLDateTime },
        owner: {
            type: OwnerType,
            resolve(parent, args) {
                return Owner.findById(parent.ownerId)
            }
        },
        asset: {
            type: AssetType,
            resolve(parent, args) {
                return Asset.findById(parent.assetId)
            }
        }

    })
})
const OwnerType = new GraphQLObjectType({
    name: "Owner",
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        avatar: { type: GraphQLString },
        specialities: { type: GraphQLString },
        tickets: {
            type: new GraphQLList(TicketType),
            resolve(parent, args) {
                return Ticket.find({ ownerId: parent.id })
            }
        }
    })
})
const AssetType = new GraphQLObjectType({
    name: "Asset",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        geoCode: { type: GraphQLString },
        kmFrom: { type: GraphQLFloat },
        kmTo: { type: GraphQLFloat },
    })

})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        ticket: {
            type: TicketType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Ticket.findById(args.id);
            }
        },
        owner: {
            type: OwnerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Owner.findById(args.id)
            }
        },
        asset: {
            type: AssetType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Asset.findById(args.id)
            }
        },
        tickets: {
            type: new GraphQLList(TicketType),
            resolve(parent, args) {
                return Ticket.find({})
            }

        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addTicket: {
            type: TicketType,
            args: {
                number: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                ownerId: { type: new GraphQLNonNull(GraphQLID) },
                assetId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let ticket = new Ticket({
                    number: args.number,
                    status: args.status,
                    description: args.description,
                    ownerId: args.ownerId,
                    assetId: args.assetId,
                });
                return ticket.save()
            }
        },
        addOwner: {
            type: OwnerType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                avatar: { type: new GraphQLNonNull(GraphQLString) },
                specialities: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let owner = new Owner({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    avatar: args.avatar,
                    specialities: args.specialities,
                });
                return owner.save()
            }
        },
        addAsset: {
            type: AssetType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                geoCode: { type: new GraphQLNonNull(GraphQLString) },
                kmFrom: { type: new GraphQLNonNull(GraphQLFloat) },
                kmTo: { type: new GraphQLNonNull(GraphQLFloat) },
            },
            resolve(parent, args) {
                let asset = new Asset({
                    name: args.name,
                    geoCode: args.geoCode,
                    kmFrom: args.kmFrom,
                    kmTo: args.kmTo,
                });
                return asset.save()
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})