import React from 'react';
import PropTypes from 'prop-types';
import './Board.sass';
import {
  SettingOutlined, DeleteOutlined, EditOutlined, SaveOutlined, RollbackOutlined,
} from '@ant-design/icons';
import { Menu, Dropdown, Button } from 'antd';

const getTimelineHighlightStyle = (i, progress) => {
  const itemWidth = '(100% - 40px) / 30';
  const offsetLeft = '40px';
  const rightRadius = progress[i + 1] ? 0 : 12;
  const leftRadius = progress[i - 1] ? 0 : 12;

  return {
    width: `calc(${itemWidth})`,
    left: `calc(${i} * (${itemWidth}) + ${offsetLeft}`,
    borderTopRightRadius: rightRadius,
    borderBottomRightRadius: rightRadius,
    borderTopLeftRadius: leftRadius,
    borderBottomLeftRadius: leftRadius,
  };
};

function Board({
  commonProps: { habits, title, type }, toggleDay, setField, removeHabit,
}) {
  const menu = (habit) => (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => setField('isEditing', true, habit)}
        icon={<EditOutlined />}
      >
        Редактировать

      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => removeHabit(habit)}
        danger
        icon={<DeleteOutlined />}
      >
        Удалить

      </Menu.Item>
    </Menu>
  );

  const generateHabitRow = (habit) => (!habit.isEditing ? (
    <div className="board__row board-row">
      <div className="board-row__settings">
        <Dropdown overlay={menu(habit)} trigger={['click']}>
          <SettingOutlined />
        </Dropdown>
      </div>
      <div className="board-row__title">{habit.title}</div>
      <div className="board-row__timeline board-timeline">
        { Array(Number(habit.duration)).fill(1).map((e, i) => (
          <>
            { habit.progress[i] ? (
              <div
                className="board-timeline__highlight"
                style={getTimelineHighlightStyle(i, habit.progress)}
              />
            ) : null}
            <button
              className="btn board-timeline__item"
              onClick={() => toggleDay(habit, i)}
              type="button"
            >
              {i + 1}
            </button>
          </>
        ))}
      </div>
    </div>
  ) : (
    <div className="board__row board-row habit-editor">
      {[{ field: 'title', name: 'Название' },
        { field: 'duration', name: 'Длительность' }].map(({ field, name }) => (
          <div className="habit-editor__item editor-item">
            <div className="editor-item__title">
              {name}
              :
            </div>
            <div className="editor-item__value">
              <input
                type="text"
                value={habit[field]}
                onChange={(e) => setField(field, e.target.value, habit)}
                className="editor-item__value-input"
              />
              <span className={`editor-item__value-text ${habit[field] ? '' : 'editor-item__value-text--empty'}`}>
                {habit[field] || 'Пусто'}
              </span>
            </div>
          </div>
      ))}

      <div className="spacer" />
      <div className="editor-item__actions">
        <Button
          type="text"
          style={{ color: '#1890FF' }}
          icon={<SaveOutlined />}
          tabIndex="-10"
          onClick={() => setField('isEditing', false, habit)}
        >
          Сохранить
        </Button>
        <Button
          type="text"
          icon={<RollbackOutlined />}
          onClick={() => setField('isEditing', false, habit)}
        >
          Отмена
        </Button>
      </div>
    </div>
  ));

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
  setField: PropTypes.func.isRequired,
  removeHabit: PropTypes.func.isRequired,
};
