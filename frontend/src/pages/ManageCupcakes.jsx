import React from "react";
import ManageProduct from "../components/ManageProduct";

function ManageCupcakes(){

    const cupcakesFields=["name","price","flavor","image"]

    return(
        <>
        <ManageProduct title="Manage Cupcakes" category='cupcakes' fields={cupcakesFields}/>
        </>
    )
}

export default ManageCupcakes;