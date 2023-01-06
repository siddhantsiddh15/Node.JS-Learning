### Introduction to CI/CD

CI/CD stands for Continuos Integration and Continuos Delivery. Somewhere CD is also Continuos Deployment.

#### Continuos Integration

It is a software developer best practice. We will continuously take a new code that we write and we integrate it to the main code that is being shared to every one.

Consider many developers are working on a code and integrating it. To make sure that code in source repository works for every system, we need a server. 

The server will detect when the code has been updated in the source repository, will build it (if required), run the automated tests (if required) and will take the result and report back to the development team.

We can add more checks to our CI process.

CI became popular with the rise of AGILE methodology and what we call as extreme programming so teams can work together.

Extreme programming means releasing our software many times a day instead of once a month.

There have been many tools that are created to make the CI pipelines.
Some of them are 

1. CircleCI
2. Travis CI
3. GitHub Actions
4. Jenkins


#### Continuos Delivery

Continuos Delivery builds on CI. CD gives confidence that our code is in production. It adds an extra guarantee into our process that each time our we add code in our main branch it is ready to be delivered. 

We don't need to release our code every time but we need to be sure that our code is ready to go in production anytime. This lets us schedule our product to be released for beta testers so we can get early feedback.



