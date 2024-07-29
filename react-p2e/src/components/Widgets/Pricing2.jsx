import React, { useState, useEffect } from 'react';
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';
import { PricingProps2 } from '../shared/types.d';
import { isExpired,useJwt } from "react-jwt";
import EspaceProject from '../../services/EspaceProject';
import { getToken } from '../../services/tokenService';
import LogoutButton from '../../layouts/LogoutBtn';
import { Link } from 'react-router-dom'; 




const Pricing2 = ({ header, prices, id, hasBackground = false }) => {
  const [projects, setProjects] = useState([]);
  const [projectTitles, setProjectTitles] = useState([]);
  const token = getToken();
  const { decodedToken } = useJwt(token);
 


 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (decodedToken && decodedToken.sub) {
        const response = await EspaceProject.GetProjectsDeposed(decodedToken.sub);
        setProjects(response.data);
        
      } else {
        console.error('Error fetching projects: Decoded token or sub is null');
    }
    } 
      catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [decodedToken]);

  useEffect(() => {
    const fetchProjectTitles = async () => {
        try {
            if (decodedToken && decodedToken?.sub) {
                const response = await EspaceProject.GetTitles2(decodedToken?.sub);
                setProjectTitles(response.data);
            } else {
                console.error('Error fetching project titles: Decoded token or sub is null');
            }
        } catch (error) {
            console.error('Error fetching project titles:', error);
        }
    };
  
    fetchProjectTitles();
  }, [decodedToken]);
  return (
    <>
       

<WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="">

    {header && <Headline header={header} containerClass="max-w-5xl" titleClass="text-2xl sm:text-3xl mb-4" />}

    <div className="flex items-stretch justify-center">
    <div className="grid grid-cols-3 gap-3  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {projects.map((project, index) => (
        <div key={index} className="col-span-3 mx-auto flex w-full sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
          <div className="card2 max-w-sm flex flex-col justify-between text-center">
            <div className="px-4 py-8">
              <h3 className="text-center text-xl font-semibold uppercase leading-6 tracking-wider mb-2">
                {projectTitles[index]}
              </h3>
            </div>
           
                <Link to={`/condidatSpace/${project.idprojet}`} className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                 Voir convoquation
                </Link>
           
          </div>
        </div>
      ))}
    </div>

    </div>
   


  </WidgetWrapper>
    </>
    
  );
};

export default Pricing2;
