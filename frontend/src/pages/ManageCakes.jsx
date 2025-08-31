import React from "react";
import ManageProduct from "../components/ManageProduct";

function ManageCakes(){
    const cakeFields=['name','price','weight','flavor','image'];

    return(
        <>
        <ManageProduct title="Manage Cakes" category="cakes" fields={cakeFields} />
        </>
    )
}

export default ManageCakes;