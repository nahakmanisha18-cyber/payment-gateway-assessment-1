import mongoose from "mongoose";

const MONGDB_URL = process.env.MONGODB_URL;

if (!MONGDB_URL){
    throw new Error("Please attach Proper MongDB URL For Connection")
}

let catched = global.mongoose

if (!catched){
    catched = global.mongoose = {conn : null, promise: null};
}

export const dbConnect = async () => {
    if(catched.conn){
        return catched.conn
    }

    if(!catched.promise){
        catched.promise = mongoose.connect(MONGDB_URL);
    }

    catched.conn = await catched.promise;
    return catched.conn
}