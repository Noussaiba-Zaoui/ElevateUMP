// import React from "react";
// import { FaUserCircle } from "react-icons/fa";

// const ResponsiveMenu = ({ showMenu, menuLinks }) => {
//   return (
//     <div
//       className={`${
//         showMenu ? "left-0" : "-left-[100%]"
//       } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
//     >
//       <div className="card">
//         <div className="flex items-center justify-start gap-3">
//           <FaUserCircle size={50} />
//           <div>
//             <h1>Bonjour </h1>
//           </div>
//         </div>
//         <nav className="mt-12">
//           <ul className="space-y-4 text-xl">
//             {menuLinks.map((data) => (
//               <li key={data.name}>
//                 <a href={data.link} className="mb-5 inline-block">
//                   {data.name}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//       <div className="footer">
//         <h1>@ P2E</h1>
//       </div>
//     </div>
//   );
// };

// export default ResponsiveMenu;


import React from "react";
import { FaUserCircle } from "react-icons/fa";

const ResponsiveMenu = ({ showMenu, menuLinks }) => {
  if (!menuLinks || menuLinks.length === 0) {
    return null; // Handle case where menuLinks is undefined or empty
  }

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1>Bonjour</h1>
          </div>
        </div>
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            {menuLinks.map((data) => (
              <li key={data.name}>
                <a href={data.link} className="mb-5 inline-block">
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="footer">
        <h1>@ P2E</h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
