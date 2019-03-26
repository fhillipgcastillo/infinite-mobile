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

example
db.movies.createIndex({"title":"text", "year":"text", "synopsis":"text", "synopsisEng":"text"}, {"weights":{"title":3, "year":1, "synopsis":1, "synopsisEng":1}, "name":"TextIndex"})


 #Final Layout Muck up
                
##Home 
  top => TabBar, header or Breadcrumb (All) => 
    TV Shows, MOvies or My List
  Billboard
  Differents categories
    => Populars
      Trendings
        Movie List/Grop of movie or tv shows
          => Type => Tv Show or Movie
            Data
  Add/Secundary Billboard
  Big Group => Big Images (opcional)
  Continue Watching
  My List (opcional)

##Home => TV Shows Section
  Top => Breacrumb 
    => Current Type/Category (TV SHows) 
      its a dropdown of categories wit current sellected
      TV Shows Categories or Genres
  Same Structure of Normal Home

##Home => Movies
  Same as TV Shows

##Header => transparent with Logo, and the breadcrumb
the bigboard of the Section  go under the header

###Each Group of movies has Lazy loading, auto loading after sertain section