import React from 'react';
import AddForm from './AddForm';

const AddMemberCommission = () => {
    return (
        <div>
            <AddForm 
                saveRedirectUrl="/liste-membres-commissions" 
                cancelRedirectUrl="/liste-membres-commissions"
                isCommission={true} // Set isCommission to true
            />
        </div>
    );
};

export default AddMemberCommission;