import React from 'react';
import {render} from '@testing-library/react';
import {Game} from '../game';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('Game history', function() {
    it('should start with empty history', async function() {
        const {queryByRole} = render(<Game/>);

        const movementHistory = queryByRole('button', {name: /go to move/i});
        expect(movementHistory).toBeNull();
    });

    it('should remember the first movement', async function() {
        const {getByTestId, getAllByRole} = render(<Game/>);
        const square = getByTestId('square-1');

        await userEvent.click(square);

        const movementHistory = getAllByRole('button', {name: /go to move/i});
        expect(movementHistory.length).toBe(1);
    });

    it('should remember the following movements', async function() {
        const {getByTestId, getAllByRole} = render(<Game/>);
        await userEvent.click(getByTestId('square-1'));

        await userEvent.click(getByTestId('square-2'));

        const movementHistory = getAllByRole('button', {name: /go to move/i});
        expect(movementHistory.length).toBe(2);
    });
});

describe('Game board', function() {
    it('should start with an empty board', function() {
        const {getAllByRole} = render(<Game/>);

        const buttons = getAllByRole('button' , {name: ''});

        expect(buttons.length).toBe(9);
    });

    it('should show the user symbol when is clicked', async function() {
        const {getByTestId} = render(<Game/>);
        const square = getByTestId('square-1');

        await userEvent.click(square);

        expect(square.innerHTML).not.toBe('');
    });

    it('should start the player X', async function() {
        const {getByTestId} = render(<Game/>);
        const square = getByTestId('square-1');

        await userEvent.click(square);

        expect(square).toHaveTextContent('X');
    });

    it('should start players play alternatively', async function() {
        const {getByTestId} = render(<Game/>);
        await userEvent.click(getByTestId('square-1'));
        const square = getByTestId('square-2');

        await userEvent.click(square);

        expect(square).toHaveTextContent('O');
    });
});

describe('Next player', function() {
    it('should show that the first player is X', function() {
        const {container} = render(<Game/>);

        const nextPlayer = container.querySelector('.game-info div');
        expect(nextPlayer).toHaveTextContent('Next player: X');
    });

    it('should be O after X make his move', async function() {
        const {container, getByTestId} = render(<Game/>);

        await userEvent.click(getByTestId('square-1'));

        const nextPlayer = container.querySelector('.game-info div');
        expect(nextPlayer).toHaveTextContent('Next player: O');
    });

    it('should be X after O make his move', async function() {
        const {container, getByTestId} = render(<Game/>);
        await userEvent.click(getByTestId('square-1'));

        await userEvent.click(getByTestId('square-2'));

        const nextPlayer = container.querySelector('.game-info div');
        expect(nextPlayer).toHaveTextContent('Next player: X');
    });

});
