import React, { useState, PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import './styles.scss';

interface IRecursiveNodes<K> {
    tree: K;
    children?: any;
}

const scopes = [
    ['{', '}'],
    ['[', ']'],
];

export const RecursiveNodes = <T extends { [key: string]: any }>({
    tree,
}: PropsWithChildren<IRecursiveNodes<T>>): JSX.Element => {
    const [visible, setVisible] = useState(false);
    const ListNodes = Object.keys(tree).reduce(
        (nodes: JSX.Element[], node: any) => {
            if (typeof tree[node] === 'object') {
                nodes.push(RecursiveNodes({ tree: tree[node] }));
            } else {
                let innerValue = tree[node];
                if (typeof tree[node] === 'function')
                    innerValue = tree[node].toString();

                nodes.push(
                    <code key={uuidv4()}>
                        {node}: {innerValue},
                    </code>,
                );
            }

            return nodes;
        },
        [],
    );

    return (
        <ul key={uuidv4()}>
            <code>
                <i>{Array.isArray(tree) ? `Array:` : `Object:`}</i>
            </code>
            {visible ? (
                <>
                    <code>{scopes[+Array.isArray(tree)][0]}</code>
                    {ListNodes}
                    <code>length: {ListNodes.length}</code>
                    <code>{scopes[+Array.isArray(tree)][1]}</code>
                </>
            ) : (
                <code onClick={() => setVisible(true)}>[...]</code>
            )}
        </ul>
    );
};

RecursiveNodes.propTypes = {
    tree: PropTypes.any.isRequired,
};
