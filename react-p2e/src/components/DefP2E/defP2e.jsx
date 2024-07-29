import React from "react";
import def1 from "../../assets/definitionPics/1.png";
import def2 from "../../assets/definitionPics/2.png";
import def3 from "../../assets/definitionPics/3.png";
const defp2elData = [
  {
    id: 1,
    name: "<strong><u>Qu’est-ce que le P2E ?</u></strong>",
    text: `
           <li>P2E est un programme qui vise l’encouragement de l’entrepreneuriat à 
           l’Université Mohammed Premier. A travers un ensemble d’outils, il
            s’agira de favoriser l’incubation de projets et d’encourager la créativité 
            et l’innovation. Le programme vous accompagne de l’idée à la création de l’entreprise.</li>
           `,
    img: def1,
  },
  {
    id: 2,
    name: " <strong><u   > Public Cible et Domaines souhaités :</u></strong>",
    text: `<strong > Domaines souhaités:<br><br></strong>
          <ul style="list-style-type: disc"; >
             <li>Numérique et intelligence artificielle</li>
             <li>Energies renouvelables et efficacité énergétique</li>
             <li>Systèmes automatisés</li>
             <li>Eau et environnement</li>
             <li>Industrie alimentaire</li>
           </ul><br>
           <strong >Public Cible :<br></strong>
           <br>
           <ul style="list-style-type: disc" ;>
             <li>Etudiants de l’université Mohamed premier en fin de cursus toutes filières confondues</li>
           </ul>
           `,
    img: def2,
  },
  {
    id: 3,
    name: "<strong><u>Plan d’action :</u></strong>",
    text:`
        <ol style="list-style-type: decimal;">
          <li>  Appel à projet</li>
          <li>Evaluation et sélection des projets</li>
          <li>Signature de l’engagement</li>
          <li>Incubation</li>
          <li>Evaluation économique</li>
          <li>Accompagnement et suivi</li>
        </ol>
            `,
    img: def3,
  },
];

const DefP2E = () => {
  return (
      <div id="defp2e" className="py-10">
        <div className="container">
          {/* testimonial section */}
          <div className="grid grid-cols-1 max-w-screen-xl mx-auto gap-6">
            {defp2elData.map(({ id, name, text, img }, index) => {
              const isSecondPage = index === 1;
              const imagePositionClass = isSecondPage ? "image-right" : "image-left";
              return (
                  <div key={id} className="my-6" data-aos="fade-up">
                    {/* card */}
                    <div className={`flex flex-col gap-5 md:gap-14 p-4 mx-4 rounded-xl  relative items-center justify-center  sm:flex-row sm:items-center`}>
                      <img
                          src={img}
                          alt=""
                          className={`block mx-auto max-w-full h-auto object-cover sm:w-[300px] sm:h-[300px]  ${imagePositionClass}`}
                      />
                      <div className={`space-y-10 ml-12 sm:text-left flex flex-col items-center justify-center ${index === 2 ? 'mr-40' : ''}`}>
                        <div className="text-2xl" dangerouslySetInnerHTML={{ __html: name }}></div>
                        <div dangerouslySetInnerHTML={{ __html: text }}></div>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default DefP2E;



