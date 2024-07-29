import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import commissionService from '../services/commissionService';
import AdminNavbar from '../layouts/Navbar/AdminNavbar';
import HomeAdminNav from '../layouts/Navbar/HomeAdminNav';

const EditForm = ({ saveUrl, cancelUrl, isCommission }) => {
    const { id } = useParams();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(isCommission ? 'COMMISSION' : '');

    useEffect(() => {
        commissionService.getCommissionMemberById(id)
            .then((response) => {
                const { firstname, lastname, email } = response.data;
                setFirstName(firstname);
                setLastName(lastname);
                setEmail(email);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const updateCommissionMember = (e) => {
        e.preventDefault();

        const updatedMember = {
            firstname,
            lastname,
            email
        };

        const queryParams = `?firstName=${firstname}&lastName=${lastname}&email=${email}`;

        commissionService.updateCommissionMember(id, updatedMember, queryParams)
            .then((response) => {
                console.log(response.data);
                window.location.href = saveUrl; // Redirection après la mise à jour
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
           
                {/* {isCommission ? <HomeAdminNav /> : <AdminNavbar />} */}
            <HomeAdminNav home={"homeAdmin"} /> 
            
            <br /><br />
            <div className="container mx-auto w-full md:w-1/2 flex justify-center">
                <form onSubmit={updateCommissionMember} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Modifier un membre </h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">Prénom:</label>
                        <input
                            type="text"
                            placeholder="Prénom"
                            name="firstname"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Nom:</label>
                        <input
                            type="text"
                            placeholder="Nom"
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            placeholder="email@gmail.com"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="bg-customBlue hover:bg-blue-950 text-white font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline">Valider</button>
                        <Link to={cancelUrl} className="bg-black hover:bg-red-600 text-white font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline ml-4">Annuler</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditForm;
