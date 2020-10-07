import React from 'react';
import PropTypes from 'prop-types';
import './Board.sass';
import HabitRow from '../Habit/HabitRow';
import HabitRowEditable from '../Habit/HabitRowEditable';

function Board({
  commonProps: { habits, title },
  toggleDay,
  updateField,
  removeHabit,
}) {
  const generateHabitRow = (habit) => {
    const components = { HabitRow, HabitRowEditable };
    const activeComponent = components[habit.isEditing ? 'HabitRowEditable' : 'HabitRow'];
    return React.createElement(activeComponent, {
      removeHabit, toggleDay, updateField, habit,
    });
  };

  return (
    <div className="board">
      <div className="board__head">
        <div className="board__title">{ title }</div>
        <div className="board__actions">
          <button className=" btn btn--link" type="button">
            Пригласить друга
          </button>
        </div>
      </div>
      <div className="board__content">
        <div className="board__row board-calendar">
          {Array(30).fill(1).map((e, i) => (
            <div className="board-calendar__item">{i + 1}</div>
          ))}
        </div>
        {habits.map(generateHabitRow)}
      </div>
    </div>
  );
}

export default Board;

Board.propTypes = {
  commonProps: PropTypes.shape({
    habits: PropTypes.array,
    title: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  toggleDay: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
  removeHabit: PropTypes.func.isRequired,
};
