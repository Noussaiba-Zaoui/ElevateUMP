import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import commissionService from '../services/commissionService';
import { Link, useParams } from 'react-router-dom';
import AdminNavbar from '../layouts/Navbar/AdminNavbar';
import HomeAdminNav from '../layouts/Navbar/HomeAdminNav';


const AddForm = ({ saveRedirectUrl, cancelRedirectUrl, isCommission }) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(isCommission ? 'COMMISSION' : '');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
 

    const { sessionId } = useParams(); // Récupérer l'ID de session depuis l'URL
    console.log(sessionId);
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{8,24}$/;
        return passwordRegex.test(password);
    };

    const saveCommission = (e) => {
        e.preventDefault();

        if (!firstname || !lastname || !email || !password || !role) {
            setError("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        if (!validatePassword(password)) {
            setError("Le mot de passe doit contenir entre 8 et 24 caractères, inclure des lettres majuscules et minuscules, un chiffre et un caractère spécial parmi !@#$%");
            return;
        }

        const Commission = {
            firstname,
            lastname,
            email,
            password,
            accountLocked: false,
            enabled: true,
            roles: [role],
        };

        let queryParams = `/addUserWithRole?email=${email}&roleName=${role}&sessionId=${sessionId}`;
        
        if (isCommission) {
            queryParams = `/addUserWithRoleCommission?email=${email}&roleName=${role}&sessionId=${sessionId}`;
        }

        commissionService.addCommissionMember(Commission, queryParams)
            .then((response) => {
                console.log(response.data);
                window.location.href = saveRedirectUrl;
            })
            .catch(error => {
                console.log(error);
                setError("Erreur lors de l'ajout du membre. Veuillez réessayer.");
            });
    };

    return (
        <div>
           
           <HomeAdminNav home={"homeAdmin"}/> 
            <br /><br />
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-full md:w-1/2">
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <form onSubmit={saveCommission}>
                                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Ajouter un membre</h2>

                                {error && <div className="text-red-500 mb-4">{error}</div>}

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">Prénom:</label>
                                    <input
                                        type="text"
                                        placeholder="Prénom"
                                        name="firstname"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={firstname}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Nom:</label>
                                    <input
                                        type="text"
                                        placeholder="Nom"
                                        name="lastname"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={lastname}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        placeholder="email@gmail.com"
                                        name="email"
                                        autoComplete="off"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mot de passe:</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Mot de passe"
                                            name="password"
                                            autoComplete="new-password"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700">
                                            <FontAwesomeIcon 
                                                icon={showPassword ? faEyeSlash : faEye} 
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="h-6 w-6 cursor-pointer" 
                                            />
                                        </span>
                                    </div>
                                </div>

                                {!isCommission && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Rôle:</label>
                                        <select
                                            name="role"
                                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="">Sélectionnez un rôle</option>
                                            <option value="COMMISSION">Membre de Commission</option>
                                            <option value="JURY">Jury</option>
                                            <option value="RESPCALENDER">responsable des calendriers</option>
                                            <option value="PRESIDENTJURY">responsable des jurys</option>
                                        </select>
                                    </div>
                                )}

                                <div className="flex justify-center space-x-4">
                                    <button type="submit" className="bg-customBlue hover:bg-blue-950 text-white font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline">Valider</button>
                                    <Link to={cancelRedirectUrl} className="bg-black hover:bg-red-600 text-white font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline">Annuler</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddForm;