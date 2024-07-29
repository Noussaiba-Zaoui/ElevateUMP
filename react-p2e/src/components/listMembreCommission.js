import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import commissionService from '../services/commissionService';
import HomeAdminNav from '../layouts/Navbar/HomeAdminNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

const ListMembreCommition = () => {
    const [commission, setCommission] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCommission, setFilteredCommission] = useState([]);

    useEffect(() => {
        fetchCommissionMembers();
    }, []);

    useEffect(() => {
        filterCommission();
    }, [searchQuery, commission]);

    const fetchCommissionMembers = () => {
        commissionService.getCommissionMembers()
            .then((response) => {
                setCommission(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const filterCommission = () => {
        const filtered = commission.filter(member => {
            const fullName = `${member.firstname} ${member.lastname}`.toLowerCase();
            return fullName.includes(searchQuery.toLowerCase());
        });
        setFilteredCommission(filtered);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const deleteCommission = (userId) => {
        commissionService.deleteCommissionMember(userId)
            .then(() => {
                fetchCommissionMembers();
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="container mx-auto">
            <HomeAdminNav home={"homeAdmin"} />
            <h2 className="text-4xl sm:text-5xl font-semibold mt-10 text-center" data-aos="fade-up">
                Membres de la Commission
            </h2>
            <br />
            <br />
            <div className="flex justify-between items-center mb-4">
                <Link to="/add-Commission" className="bg-customBlue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    <FontAwesomeIcon icon={faPlus} size="sm" />
                </Link>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Recherche par nom..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                        style={{ paddingLeft: '2.5rem' }}
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </div>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 py-2">Prénom</th>
                        <th className="border border-gray-300 py-2">Nom</th>
                        <th className="border border-gray-300 py-2">Email</th>
                        <th className="border border-gray-300 py-2 w-40">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCommission.map((member) => (
                        <tr key={member.id}>
                            <td className="border border-gray-300 py-2">{member.firstname}</td>
                            <td className="border border-gray-300 py-2">{member.lastname}</td>
                            <td className="border border-gray-300 py-2">{member.email}</td>
                            <td className="border border-gray-300 py-2 flex space-x-2 items-center justify-center">
                                <Link to={`/users/${member.id}`} className="bg-customBlue text-white font-bold rounded focus:outline-none focus:shadow-outline ml-5 py-2 px-4">
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <button onClick={() => deleteCommission(member.id)} className="bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListMembreCommition;
