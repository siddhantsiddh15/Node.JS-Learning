Our browser contacts the DNS and asks for the url. The DNS searches for the address and returns an IP address to the browser. 

This IP address will let us communicate with the server and allow's the flow of information.

https encrypts our data while transferring so no one sees our data. Ther server often sends data like JSON, XML, Text, Images or Videos.


#### HTTP Requests are made up of these parameters

1.Method : ex- POST
2.PATH : collection or a specific item of the collection. This path is also sometime called as resource
that we are breifly accessing on the backend
3.BODY : Contains the data that we are sending from browser to the server. This could be a plain text but the most common format for sending data back and forth over HTTP is JSON.

example - {text: 'hello', photo: 'smile.jpg'}

Usually we have ** BODY ** on post, put requests and not for delete or get requests because server has all the information it requires for a delete and get requests.

4.HEADERS: This is the 4th part of every single request. These are optional properties that you can specify on a request to send additional metadata to the servers ie. information about the data that we are requesting.

ex: size of the data we are sending, authentication information that we are sending.

These are optional depending on our use case but ** there is one request every single request needs ** . It is the ** Host Header ** which specifies which server your request is being sent to including (sometimes) port number of that site.

#### Responses in HTTP

HTTP responses have 3 main part.

1.Headers : It is optional and tells us the type of data that is being sent in the body of the request.
example - Content-Type: application/json

2.BODY: It contains the data that we are fetching from the server.

example - {text: 'hi!'}

3. STATUS CODE - A request will never containa status code. Status Code tells us whether the request was successful or not. 
Status Code 200 to 299 means successful responses.


