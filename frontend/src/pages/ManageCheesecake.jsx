import React from "react";
import ManageProduct from "../components/ManageProduct";

function ManageCheesecake(){

    const cheesecakeFields=["name","price","flavor","image"]

    return(
        <>
        <ManageProduct title="Manage Cheesecake" category='cheesecake' fields={cheesecakeFields}/>
        </>
    )
}

export default ManageCheesecake;