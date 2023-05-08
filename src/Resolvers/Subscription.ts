export const Subscription = {
    cvAdded:{
        subscribe: (parent, args, { db, pubSub }) => pubSub.subscribe("cvAdded"),
        resolve: (payload) => { return payload;}},
    cvUpdated:{
        subscribe: (parent, args, { db, pubSub }) => pubSub.subscribe("cvUpdated"),
        resolve: (payload) => { return payload;}},
    cvDeleted:{
        subscribe: (parent, args, { db, pubSub }) => pubSub.subscribe("cvDeleted"),
        resolve: (payload) => { return payload;}}
    }
