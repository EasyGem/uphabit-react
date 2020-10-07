import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'antd';
import { SettingOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

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

function HabitRow({
  habit, removeHabit, updateField, toggleDay,
}) {
  const optionsMenu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => updateField('isEditing', true, habit)}
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

  return (
    <div className="board__row board-row">
      <div className="board-row__settings">
        <Dropdown overlay={optionsMenu} trigger={['click']}>
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
  );
}

export default HabitRow;

HabitRow.propTypes = {
  habit: PropTypes.shape({
    title: PropTypes.string,
    duration: PropTypes.number,
    progress: PropTypes.array,
  }).isRequired,
  toggleDay: PropTypes.func.isRequired,
  removeHabit: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
};
