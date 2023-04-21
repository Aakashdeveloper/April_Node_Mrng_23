async function getData(db,colName,query){
    return await db.collection(colName).find(query).toArray()
}

async function getDatawithsort(db,colName,query,sort){
    return await db.collection(colName).find(query).sort(sort).toArray()
}

async function getDatawithsortlimit(db,colName,query,sort,skip,limit){
    return await db.collection(colName).find(query).sort(sort).skip(skip).limit(limit).toArray()
}

async function postData(db,colName,query){
    return await db.collection(colName).find(query).toArray()
}

module.exports = {
    getData,
    getDatawithsort,
    getDatawithsortlimit,
    postData
}