let express = require('express');
let categoryRouter = express.Router();

const category = [
    {
        "id":1,
        "category": "Fashion",
        "thumb":"https://i.ibb.co/56VP0Fn/cloths.jpg"
    },
    {
        "id":2,
        "category":"Electronics",
        "thumb":"https://i.ibb.co/pw5Wtdx/appliances.jpg"
    },
    {
        "id":3,
        "category":"Essentials",
        "thumb":"https://i.ibb.co/0cw34xm/essentials.jpg"
    },
    {
        "id":4,
        "category": "Footwear",
        "thumb":"https://i.ibb.co/r3SZq8S/footware.jpg"
    }
]

function router(menu){

    categoryRouter.route('/')
        .get((req,res) => {
        res.render('category',{title:'Category Page',category,menu})
    })

    categoryRouter.route('/details')
        .get((req,res) => {
        res.send('Category Details')
    })

    return categoryRouter
}



module.exports = router