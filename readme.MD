##Requeriments##
npm install apollo-boost react-apollo graphql-tag graphql apollo-client-preset

##Deploying  exampl##
expo build:<android/ios> --release-channel <Channel ex:prod-v1>
Example
expo build:android --release-channel stage-v1

##publishing a release channel##
expo publish --release-channel staging

##create mongo index##

###create index for specific values/columns###
* db.collection.createIndex( { "columnName": "columnType" } )

###create index for all text values###
* db.collection.createIndex( { "$**": "text" } )

###Create Index with Weight
db.blog.createIndex(
   {
     columnName: "type",
     ...
   },
   {
     weights: {
       columnName: (Weight)10,
       ...
     },
     name: "IndexName"
   }
 )
