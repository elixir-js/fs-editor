/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'mobx-react';
import sinon from 'sinon';

import { FileButton } from '..';

import * as appModels from '@app/models';
import { ExtensionType } from '@app/types';

test('Should render properly', () => {
    const props = {
        extension: ExtensionType.JS,
        name: 'main',
    };

    const { container } = render(
        <Provider {...appModels}>
            <FileButton {...props} />
        </Provider>,
    );

    expect(container.firstChild).toHaveClass('file-button');
});

test('Should get an error with wrong prop type', () => {
    const stub = sinon.stub(console, 'error');

    // @ts-ignore
    const RenderErrorComponent = <FileButton />;
    render(<Provider {...appModels}>{RenderErrorComponent}</Provider>);

    expect(stub.called).toBe(true);
    expect(
        stub.calledWithExactly(`Warning: Failed prop type: The prop \`name\` is marked as required in \`inject-with-editorDataModel(Function)\`, but its value is \`undefined\`.
    in inject-with-editorDataModel(Function)`),
    ).toBe(true);
});

test('Should be active on action click', () => {
    const props = {
        extension: ExtensionType.JS,
        name: 'main',
    };

    const { container } = render(
        <Provider {...appModels}>
            <FileButton {...props} />
        </Provider>,
    );

    fireEvent.click(screen.getByText('main.js'));
    expect(container.firstChild).toHaveClass('file-button--active');
});
