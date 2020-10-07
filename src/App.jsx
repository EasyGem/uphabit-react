import React, { useState, useEffect } from 'react';
import Board from './components/Board/Board';
import getBoards from './requests/boards/getBoards';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, status } = await getBoards();
      if (status !== 200) return;

      setBoards(data);
    })();
  }, []);

  const updateBoard = (board) => {
    const boardIndex = boards.findIndex((e) => e.id === board.id);
    const boardsList = boards.splice(boardIndex, 1, board);
    setBoards(boardsList);
  };

  const updateHabit = (habit, board) => {
    const habitIndex = board.habits.findIndex((e) => e.id === habit.id);
    board.habits.splice(habitIndex, 1, habit);
    updateBoard(board);
  };

  const toggleDay = (habit, dayIndex, board) => {
    const updatedHabit = { ...habit };
    updatedHabit.progress[dayIndex] = Number(!habit.progress[dayIndex]);
    updateHabit(updatedHabit, board);
  };

  const updateField = (habit, fieldName, value, board) => {
    const updatedHabit = { ...habit };
    updatedHabit[fieldName] = value;
    updateHabit(updatedHabit, board);
  };

  const removeHabit = (habit, board) => {
    const habitIndex = board.habits.findIndex((e) => e.id === habit.id);
    board.habits.splice(habitIndex, 1);
    updateBoard(board);
  };

  return (
    <>
      <div className="boards-wrapper">
        { boards.map((board) => (
          <Board
            toggleDay={(habit, dayIndex) => toggleDay(habit, dayIndex, board)}
            updateField={(fieldName, value, habit) => updateField(habit, fieldName, value, board)}
            removeHabit={(habit) => removeHabit(habit, board)}
            commonProps={board}
          />
        ))}
      </div>
    </>
  );
}

export default App;
