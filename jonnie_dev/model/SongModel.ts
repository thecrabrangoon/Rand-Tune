import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess';
import {ISongModel} from '../interfaces/ISongModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class SongModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                title: String,
                description: String,
                musician: String,
                album: String,
                genre: String,
                review_count: Number,
                raw_data: String,
            }, {collection: 'songs'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<ISongModel>("Songs", this.schema);
    }

    public retrieveAllSongs(response:any) {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }
}
export {SongModel};