import React from 'react';
import {render} from '@testing-library/react';
import {Game} from '../game';
import userEvent from '@testing-library/user-event';

describe('Game history', function() {
    it('should start with empty history', function() {
        const {container} = render(<Game/>);

        const movementHistory = container.querySelectorAll('.game-info li');
        expect(movementHistory.length).toBe(1);
    });

    it('should remember a movement', async function() {
        const {container, getByTestId} = render(<Game/>);
        const square = getByTestId('square-1');

        await userEvent.click(square);

        const movementHistory = container.querySelectorAll('.game-info li');
        expect(movementHistory.length).toBe(2);
    });
});
