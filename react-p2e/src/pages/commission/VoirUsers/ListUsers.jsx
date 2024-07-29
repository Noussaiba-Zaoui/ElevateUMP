import React, { useState, useEffect } from 'react';
import commissionService from '../../../services/commissionService';
import CommissionNavbar from '../CommissionNavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';


const ListUsers = () => {
    const [commission, setCommission] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCommission, setFilteredCommission] = useState([]);
    const { startDate, endDate,id } = useParams();

    useEffect(() => {
        fetchCommissionMembers();
    }, []);

    useEffect(() => {
        filterCommission();
    }, [searchQuery, commission]);

    

    const fetchCommissionMembers = () => {
        commissionService.getAllUsers()
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

   

    
    

    return (
        <div className="container mx-auto">
            <div>
                <CommissionNavbar home={"commissionHome"} startDate={startDate} endDate={endDate} sessionId={id}/>

                <h2 className="text-4xl sm:text-5xl font-semibold mt-10 text-center">Liste des Utilisateurs</h2>

                <div className="flex justify-between items-center mb-4">
                   
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                            style={{ paddingLeft: '2.5rem', border: '0px solid #5d00c8' }}
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
                                   
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>

              
            </div>
        </div>
    );
};

export default ListUsers;
