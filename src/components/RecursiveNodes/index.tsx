import React from 'react';

import './styles.scss';

export const RecursiveNodes = (tree: any) => {
    const ListNodes = Object.keys(tree).reduce((nodes: any[], node: any) => {
        global.console.log(typeof node);
        if (typeof tree[node] === 'object') {
            nodes.push(RecursiveNodes(tree[node]));
        } else {
            let innerValue = tree[node];
            if (typeof tree[node] === 'function')
                innerValue = tree[node].toString();

            nodes.push(
                <li key={node.concat(Math.random() ** 10)}>
                    {node}: {innerValue}
                </li>,
            );
        }

        return nodes;
    }, []);

    return (
        <ul>
            <span>
                {Array.isArray(tree) ? `Array[${tree.length}]:` : 'Object:'}
            </span>
            {ListNodes}
        </ul>
    );
};
