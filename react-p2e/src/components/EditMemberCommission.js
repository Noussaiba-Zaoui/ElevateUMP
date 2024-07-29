import React from 'react';
import EditForm from './EditForm';

const EditMemberCommission = () => {
    return (
        <div>
            <EditForm 
                saveUrl="/liste-membres-commissions" 
                cancelUrl="/liste-membres-commissions"
                isCommission={true}
            />
        </div>
    );
};

export default EditMemberCommission;