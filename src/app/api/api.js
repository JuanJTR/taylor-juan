import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("yourDatabaseName");

    switch (req.method) {
        case 'GET':
            return getItems(req, res, db);
        case 'POST':
            return addItem(req, res, db);
        case 'PUT':
            return updateItem(req, res, db);
        case 'DELETE':
            return deleteItem(req, res, db);
        default:
            res.status(405).end(); //Method Not Allowed
    }
}

async function getItems(req, res, db) {
    const items = await db.collection("items").find({}).toArray();
    res.json(items);
}

async function addItem(req, res, db) {
    const newItem = JSON.parse(req.body);
    const result = await db.collection("items").insertOne(newItem);
    res.status(201).json(result);
}

async function updateItem(req, res, db) {
    const { id, ...updateData } = JSON.parse(req.body);
    const result = await db.collection("items").updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );
    res.json(result);
}

async function deleteItem(req, res, db) {
    const { id } = JSON.parse(req.body);
    const result = await db.collection("items").deleteOne({ _id: new ObjectId(id) });
    res.json(result);
}