import React from 'react';
import EditForm from './EditForm';
import { useParams } from 'react-router-dom';

const EditUser = () => {
    const {sessionId,startDate,endDate } = useParams();
    return (
        <div>
            <EditForm 
                saveUrl={`/session/${startDate}/${endDate}/${sessionId}/users`}
                cancelUrl={`/session/${startDate}/${endDate}/${sessionId}/users`}
                isCommission={false}
            />
        </div>
    );
};

export default EditUser;