import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { FileButton } from '..';

import { Provider } from 'mobx-react';
import * as appModels from '@app/models';
import { ExtensionType } from '@app/types';

test('Should render properly', () => {
    const props = {
        handleClick: () => {
            console.log('Clicked');
        },
        extension: ExtensionType.JS,
        name: 'main',
    };

    const { container } = render(
        <Provider {...appModels}>
            <FileButton {...props} />
        </Provider>,
    );

    expect(container.firstChild).toHaveClass('file-button');

    // fireEvent.click(container.firstChild);
    // expect(setActiveIndex).toBeCalledTimes(1);

    // fireEvent.click(container.lastChild);
    // expect(setActiveIndex).toBeCalledTimes(2);
});
