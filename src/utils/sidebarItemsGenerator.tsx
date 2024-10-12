import { TSidebar, TUserPath } from '../type';
import { NavLink } from 'react-router-dom';

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
    const sidebarItems = items.reduce((acc: TSidebar[], item) => {
        if (item.path && item.name) {
            acc.push({
                key: item.name, 
                label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
            });
        }

       
        if (item.children) {
            const childItems = item.children.map((child) => {
                if (child.name) {
                    return {
                        key: child.name, 
                        label: (
                            <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
                        ),
                    };
                }
                return null; 
            });

            // Filter out nulls and ensure we only return valid TSidebar items
            const validChildItems = childItems.filter(
                (child) => child !== null
            );

            acc.push({
                key: item.name || 'Key', 
                label: item.name || 'Label', 
                children: validChildItems.length > 0 ? validChildItems : undefined, 
            });
        }

        return acc;
    }, []);

    return sidebarItems;
};
