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

    it('should remember the first movement', async function() {
        const {container, getByTestId} = render(<Game/>);
        const square = getByTestId('square-1');

        await userEvent.click(square);

        const movementHistory = container.querySelectorAll('.game-info li');
        expect(movementHistory.length).toBe(2);
    });

    it('should remember the following movements', async function() {
        const {container, getByTestId} = render(<Game/>);
        await userEvent.click(getByTestId('square-1'));

        await userEvent.click(getByTestId('square-2'));

        const movementHistory = container.querySelectorAll('.game-info li');
        expect(movementHistory.length).toBe(3);
    });
});

describe('Game board', function() {
    it('should start with an empty board', function() {
        const {container} = render(<Game/>);

        const buttons = container.querySelectorAll('.square');
        buttons.forEach((button) => {
            expect(button.innerHTML).toBe('');
        });
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

        expect(square.innerHTML).toBe('X');
    });

    it('should start players play alternatively', async function() {
        const {getByTestId} = render(<Game/>);
        await userEvent.click(getByTestId('square-1'));
        const square = getByTestId('square-2');

        await userEvent.click(square);

        expect(square.innerHTML).toBe('O');
    });
});

describe('Next player', function() {
    it('should show that the first player is X', function() {
        const {container} = render(<Game/>);

        const nextPlayer = container.querySelector('.game-info div');
        expect(nextPlayer.innerHTML).toBe('Next player: X');
    });

    it('should be O after X make his move', async function() {
        const {container, getByTestId} = render(<Game/>);

        await userEvent.click(getByTestId('square-1'));

        const nextPlayer = container.querySelector('.game-info div');
        expect(nextPlayer.innerHTML).toBe('Next player: O');
    });

    it('should be X after O make his move', async function() {
        const {container, getByTestId} = render(<Game/>);
        await userEvent.click(getByTestId('square-1'));

        await userEvent.click(getByTestId('square-2'));

        const nextPlayer = container.querySelector('.game-info div');
        expect(nextPlayer.innerHTML).toBe('Next player: X');
    });

});
