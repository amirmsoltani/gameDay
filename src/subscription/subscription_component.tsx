import React from 'react';
import { useGetUser } from 'src/auth/UserProvider';
import observer from './notification_observer';

export const SubscriptionComponent = () => {
    const user = useGetUser();
    React.useEffect(() => {
        if(typeof user === 'object') observer.observe(user.id);
        return () => observer.disconnect();
    }, [user]);

    return null;
};
