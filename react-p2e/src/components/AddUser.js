import React from 'react';
import AddForm from './AddForm';
import { useParams } from 'react-router-dom';

const AddUser = () => {
    const { sessionId,startDate,endDate } = useParams();
    return (
        <div>
            <AddForm 
                saveRedirectUrl={`/session/${startDate}/${endDate}/${sessionId}/users`}
                cancelRedirectUrl={`/session/${startDate}/${endDate}/${sessionId}/users`}
                isCommission={false} // Set isCommission to true{`/add-user/${sessionId}`}
            />
        </div>
    );
};

export default AddUser;