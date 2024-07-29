import React from "react";
import Brand1 from "../../assets/brands/1.svg";
import Brand2 from "../../assets/brands/2.svg";
import Brand3 from "../../assets/brands/3.svg";
import Brand4 from "../../assets/brands/4.svg";


const BrandsLogo = () => {
  return (
    <>
     <div className="container mb-12 mt-12 sm:mt-0">
        <h1 className="text-center">Ce programme est le résultat d’une convention entre :</h1>
        <div className="py-6 md:px-32 flex flex-wrap items-center justify-evenly gap-3">
          <img src={Brand2} alt="" />
          <img src={Brand3} alt="" />
          <img src={Brand1} alt="" />
          <img src={Brand4} alt="" />
        </div>
      </div>
    </>
  );
};

export default BrandsLogo;
