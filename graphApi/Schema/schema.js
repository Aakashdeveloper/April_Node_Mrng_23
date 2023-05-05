let graphql = require('graphql');
let axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString
} = graphql;

const ProductType = new GraphQLObjectType({
    name:'Products',
    fields:{
        id:{type:GraphQLInt},
        product_name: {type:GraphQLString},
        category: {type:GraphQLString},
        category_id: {type:GraphQLInt},
        Price: {type:GraphQLInt},
        Size: {type:GraphQLString},
        Image: {type:GraphQLString},
        Color: {type:GraphQLString},
        Brand: {type:GraphQLString},
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        Products:{
            type:ProductType,
            args:{id:{type:GraphQLInt}},
            resolve(parentValue,args){
                return axios.get(`http://localhost:9888/products/${args.id}`)
                .then((res) => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

/*
{
  Products(id:2){
    product_name,
    category,
    Color
  }
}
*/