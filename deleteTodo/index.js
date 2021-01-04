const ObjectId = require("mongodb").ObjectId;
const MongoClient = require("mongodb").MongoClient;

module.exports = async function (context, req) {
    const URL = process.env.MONGODB_URL;
    //'mongodb://cosmos-ust-todos:gvs19AADRNehzSDcxJTuc2TqCtTBZyAx8UOnDbUH23qCwYwTW8dyPgF3PMDRSzOlHDOvfR93Q33hooiNvAGSYg%3D%3D@cosmos-ust-todos.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmos-ust-todos@';
    const DATABASE_NAME = process.env.MONGODB_DATABASE_NAME
    //'serverless';
    const COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME
    //'todos';

    const connection = await MongoClient.connect(URL, { useUnifiedTopology: true });
    const todoCollection = connection.db(DATABASE_NAME)
        .collection(COLLECTION_NAME);

    const results = await todoCollection
        .deleteOne(
            { _id: ObjectId(req.params.id) },
        );

    await connection.close();

    return {
        // status: 200, /* Defaults to 200 */
        body: '{ "message": "sucess" }'
    };
}
