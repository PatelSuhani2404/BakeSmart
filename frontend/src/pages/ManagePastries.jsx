import React from "react";
import ManageProduct from "../components/ManageProduct";

function ManagePastries(){

    const pastriesFields=["name","price","flavor","image"]

    return(
        <>
        <ManageProduct title="Manage Pastries" category="pastries" fields={pastriesFields}/>
        </>
    )
}

export default ManagePastries;