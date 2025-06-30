import { Outlet } from 'react-router-dom';

export const EmptyRouteLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};
