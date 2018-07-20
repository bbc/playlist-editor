'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');
const http = require('http');

const dynamo = new doc.DynamoDB();

function nitrorequest(params, done) {
    var qs = "";
    Object.keys(params).forEach(function(key) {
        var val = params[key];
        qs += '&' + key + '=' + val
    });
    var options = {
        host: "programmes.api.bbc.com",
        path: "/nitro/api/programmes?api_key="+process.env.API_KEY+qs,
        headers: {
            accept: 'application/json'
        }
    };
    //console.log("nitro request "+options.path);
    return http.get(options, function(res) {
            var data = '';
            res.on('data', (chunk) => {
              data += chunk;
            });
            res.on('end', () => {
                var json = JSON.parse(data);
                if(json.nitro) {
                    var results = json.nitro.results;
                    if(results.total > 0) {
                        done(null, json);
                    }
                    else {
                        done(new Error('no items'));
                    }
                }
                else {
                    done(new Error('no data'));
                }
            });
        });
}


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });

    switch (event.httpMethod) {
        case 'DELETE':
            dynamo.deleteItem(JSON.parse(event.body), done);
            break;
        case 'GET':
            //dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
            nitrorequest(
                Object.assign({
                    'entity_type': 'clip',
                    'media_type': 'audio_video',
                    'sort': 'release_date',
                    'sort_direction': 'descending',
                    'mixin': 'available_versions',
                    'tag_name': 'marathi'
                }, event.queryStringParameters), done
            );
            break;
        case 'POST':
            dynamo.putItem(JSON.parse(event.body), done);
            break;
        case 'PUT':
            dynamo.updateItem(JSON.parse(event.body), done);
            break;
        case 'OPTIONS':
            done(null, 'ok');
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
