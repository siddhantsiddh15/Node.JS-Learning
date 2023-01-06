### Working with existing APIs

We will the sample SpaceX REST whose source can be found on (git)[https://github.com/r-spacex/SpaceX-API] . 

On clicking the link you will go to the github page of the SpaceX API. You will get the following URL below the 'Usage' section

```
GET https://api.spacexdata.com/v5/launches/latest

```

The *** v5 *** means that the current version of API is 5. Any endpoint after v5 will direct to the 5th version of the REST API.

When we release our API in public in production, it is wise to version our API so the client can change to specific versions as per their schedule.

