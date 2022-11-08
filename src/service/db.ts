
import sqlite3 from 'sqlite3';

const DATABASE_FILE = process.env.DATABASE_FILE;
if(!DATABASE_FILE)
    throw new Error("Database no funciona");



export const openConnection = () => {
    let db = new sqlite3.Database(DATABASE_FILE)
        return db
}

export const queryFirst = async(query: string, params?: any[]) =>{
    const devolver = await queryDb(query, params);
    return devolver[0];
}

export const queryDb = (query: string, params?: any[]) => {
    let db = openConnection();
    return new Promise<any[]>((resolve, reject) => {

        db.all(query, params, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        })

    })
    .finally(() => {
        db.close();
    })
}