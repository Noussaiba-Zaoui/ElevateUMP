import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import commissionService from '../services/commissionService';
import HomeAdminNav from '../layouts/Navbar/HomeAdminNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faMinus, faSearch } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from '../layouts/Navbar/AdminNavbar';

const UsersList = () => {
    const [commission, setCommission] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [role, setRole] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCommission, setFilteredCommission] = useState([]);
    const [action, setAction] = useState('add');
    const {startDate,endDate,sessionId } = useParams();

    useEffect(() => {
        fetchCommissionMembers();
    }, [sessionId]);

    useEffect(() => {
        filterCommission();
    }, [searchQuery, commission]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const fetchCommissionMembers = () => {
        const fetchMethod = sessionId ? commissionService.getUsersBySession(sessionId) : commissionService.getAllUsers();

        fetchMethod
            .then(response => {
                const commissionMembers = response.data;
                const promises = commissionMembers.map(member => {
                    return commissionService.getUserRolesByEmail(member.email);
                });

                Promise.all(promises)
                    .then(roleResponses => {
                        const commissionMembersWithRoles = commissionMembers.map((member, index) => {
                            const roles = roleResponses[index].data.map(role => role.role);
                            return { ...member, roles };
                        });

                        setCommission(commissionMembersWithRoles);
                    })
                    .catch(error => {
                        console.log(error);
                    });
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

    const handleAddRoles = (user) => {
        setSelectedUser(user);
        setAction('add');
    };

    const handleRemoveRole = (user) => {
        setSelectedUser(user);
        setAction('remove');
        setRole(user.roles.length > 0 ? user.roles[0] : '');
    };

    const handleSubmit = () => {
        if (!role || !selectedUser) {
            return;
        }

        if (action === 'add') {
            commissionService.addRoleToUser(selectedUser.email, role)
                .then(() => {
                    console.log('Role added successfully');
                    fetchCommissionMembers();
                    setSelectedUser(null);
                    setRole('');
                })
                .catch(error => {
                    console.error('Error adding role to user:', error);
                });
        } else if (action === 'remove') {
            commissionService.removeRoleFromUser(selectedUser.email, role)
                .then(() => {
                    console.log('Role removed successfully');
                    fetchCommissionMembers();
                    setSelectedUser(null);
                    setRole('');
                })
                .catch(error => {
                    console.error('Error removing role from user:', error);
                });
        }
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
            <AdminNavbar home={"homeAdmin"} startDate={startDate} endDate={endDate} sessionId={sessionId} />
            <h2 className="text-4xl sm:text-5xl font-semibold mt-10 text-center">Liste des Utilisateurs</h2>
            <div className="flex justify-between items-center mb-4">
                <Link to={`/add-user/${startDate}/${endDate}/${sessionId}`} className="bg-customBlue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    <FontAwesomeIcon icon={faPlus} size="lg" />
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
                        <th className="border border-gray-300 py-2">Roles</th>
                        <th className="border border-gray-300 py-2 w-80" style={{ maxWidth: "150px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCommission.map((member) => (
                        <tr key={member.id}>
                            <td className="border border-gray-300 py-2">{member.firstname}</td>
                            <td className="border border-gray-300 py-2">{member.lastname}</td>
                            <td className="border border-gray-300 py-2">{member.email}</td>
                            <td className="border border-gray-300 py-2 px-4 relative" style={{ maxWidth: "150px" }}>
                                {member.roles.join(', ')}
                                <div className="absolute top-1 right-1 flex flex-col items-center space-y-1">
                                    <button
                                        onClick={() => handleAddRoles(member)}
                                        className="text-blue-900 hover:text-blue-950"
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                    <button
                                        onClick={() => handleRemoveRole(member)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                </div>
                            </td>
                            <td className="border border-gray-300 py-2 flex space-x-4 items-center">
                                <Link to={`/users/${member.id}/${startDate}/${endDate}/${sessionId}`} className="bg-customBlue text-white font-bold rounded focus:outline-none focus:shadow-outline ml-5 py-2 px-4">
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

            {selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-900 opacity-25"></div>
                    <div className="relative bg-white rounded-lg p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-75">
                        <h3 className="text-lg font-semibold mb-4">
                            {action === 'add' ? `Ajouter un rôle à ${selectedUser.firstname} ${selectedUser.lastname}` : `Retirer un rôle de ${selectedUser.firstname} ${selectedUser.lastname}`}
                        </h3>
                        {action === 'add' ? (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Sélectionner un rôle</label>
                                <select
                                    name="role"
                                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Sélectionner un rôle</option>
                                    <option value="COMMISSION">Membre de commission</option>
                                    <option value="RESPCALENDER">Responsable des calendriers</option>
                                    <option value="JURY">JURY</option>
                                    <option value="PRESIDENTJURY">Présidents des jurys</option>

                                </select>
                            </div>
                        ) : (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Sélectionner un rôle à supprimer:</label>
                                <select
                                    name="role"
                                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 focus:shadow-outline"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Sélectionner un rôle</option>
                                    <option value="COMMISSION">Membre de commission</option>
                                    <option value="RESPCALENDER">Responsable des calendriers</option>
                                    <option value="JURY">JURY</option>
                                    <option value="PRESIDENTJURY">Présidents des jurys</option>
                                </select>
                            </div>
                        )}
                        <div className="flex justify-end">
                            <button onClick={handleSubmit} className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">
                                {action === 'add' ? 'Ajouter le rôle' : 'supprimer le rôle'}
                            </button>
                            <button onClick={() => setSelectedUser(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ml-4">
                               Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersList;
