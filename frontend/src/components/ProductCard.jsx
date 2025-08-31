import './ProductCard.css'

function ProductCard({ name,price,image,weight,flavor,onAddToCart }){
    return(
        <>
        <div className="card">
            <img src={`http://localhost:5000${image}`} className="card-img-top" alt={name}/>
            <div className="card-body text-center">
                <h5 className="card-title"> {name} </h5>
                <p className="card-text"> Rs.{price} </p>
                {weight && <p className="card-text"> Weight : {weight} </p>}
                {flavor && <p className="card-text"> Flavor : {flavor} </p>}
                <button className="btn btn-sm btn-success" onClick={onAddToCart}> Add to Cart </button>
            </div>
        </div>
        </>
    )
}

export default ProductCard