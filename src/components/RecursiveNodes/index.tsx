import React from 'react';

import './styles.scss';

export const RecursiveNodes = (values: any) => {
    const ListNodes = Object.keys(values).reduce((nodes: any[], list: any) => {
        global.console.log(typeof list);
        if (typeof values[list] === 'object') {
            nodes.push(RecursiveNodes(values[list]));
        } else {
            nodes.push(
                <li key={list.concat(Math.random() ** 10)}>
                    {list}: {values[list]}
                </li>,
            );
        }

        return nodes;
    }, []);

    return (
        <ul>
            <span>
                {Array.isArray(values) ? `Array[${values.length}]:` : 'Object:'}
            </span>
            {ListNodes}
        </ul>
    );
};
