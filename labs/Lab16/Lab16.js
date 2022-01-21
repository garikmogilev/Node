const  http = require('http');
const  fs = require('fs');
const { graphql, buildSchema } = require('graphql');

const resolvers = require('./modules/resolver');
const schema = buildSchema(fs.readFileSync('./graphql.graphql').toString());
const Db = require('./modules/DB');

const context = new Db();


http.createServer((request, response) =>
{
    let body = '';
    request.on('data', chunk => body += chunk);
    request.on('end', () =>
    {

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');

        if (request.url === '/' && request.method === 'POST')
        {
            let graphqlRequest = '';
            try
            {
                graphqlRequest = JSON.parse(body);
                if (graphqlRequest.query)
                {
                    graphql(schema, graphqlRequest.query, resolvers, context, graphqlRequest.variables)
                        .then(result =>
                        {
                            if (result.errors)
                            {
                                response.statusCode = 400;
                            }
                            response.end(JSON.stringify(result, null, '  '));
                        }).catch(err =>
                    {
                        response.statusCode = 500;
                        response.end(JSON.stringify({error: err}, null, '  '));
                    });
                }
                else
                {
                    response.statusCode = 400;
                    response.end();
                }
            }
            catch (err)
            {
                response.statusCode = 500;
                response.end(JSON.stringify({error: err}, null, '  '));
            }
        }
        else
        {
            response.statusCode = 404;
            response.end();
        }
    });
}).listen(3000, () =>
{
    console.log(`Server listen localhost:3000`);
});