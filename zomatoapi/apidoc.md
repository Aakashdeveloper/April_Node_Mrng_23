//page 1

* List of all cities
> http://localhost:1221/location
* List of all restaurants
> http://localhost:1221/restaurants
* Restaurants wrt city
> http://localhost:1221/restaurants?stateId=3
> http://localhost:1221/restaurants?mealId=3&stateId=1
* List of meals
> http://localhost:1221/meals


//Page 2
* Restaurants on the basis to mealType
> http://localhost:1221/restaurants?mealId=3
* Restaurants wrt mealType + CuisineType
> http://localhost:1221/filter/1?cuisineId=2
* Restaurants wrt mealType + cost
> http://localhost:1221/filter/1?hcost=600&lcost=300
> http://localhost:1221/filter/1?hcost=600&lcost=300&cuisineId=1
* Sort on the basis of price 
> http://localhost:1221/filter/1?hcost=600&lcost=300&sort=-1
* Pagination
> http://localhost:1221/filter/1?cuisineId=2&skip=1&limit=1

//Page 3
* Details of the restaurants
> http://localhost:1221/details/6288d22dbb17b75750d11cb1
* Menu wrt to restaurants
> http://localhost:1221/menu/9

//Page 4
* Details of selected Menu
> (POST)  http://localhost:1221/menuDetails
{"id":[1,2,3]}
* Place Order
> (POST) http://localhost:1221/placeOrder
{
        "orderId": 4,
        "name": "Isha",
        "email": "isha@gmail.com",
        "address": "Hom 65",
        "phone": 8934645457,
        "cost": 255,
        "menuItem": [
            12,10
        ]
    }

//Page 5
* View All order/ With or without email
> http://localhost:1221/orders?email=amit@gmail.com
> http://localhost:1221/orders
* Update order details
> (PUT) http://localhost:1221/updateOrder
{
	"_id":"642a31906a5daa13032fa222",
	"status":"Delivered"
}

* Delete order
> (DELETE) http://localhost:1221/deleteOrder
{
	 "_id": "6445f0528ab6852ec0834d2a"
}