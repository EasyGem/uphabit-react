import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons';

function HabitRowEditable({ habit, updateField }) {
  return (
    <div className="board__row board-row habit-editor">
      {[{ field: 'title', name: 'Название' },
        { field: 'duration', name: 'Длительность' }].map(({ field, name }) => (
          <div className="habit-editor__item editor-item">
            <div className="editor-item__title">
              {`${name}:`}
            </div>
            <div className="editor-item__value">
              <input
                type="text"
                value={habit[field]}
                onChange={(e) => updateField(field, e.target.value, habit)}
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
          onClick={() => updateField('isEditing', false, habit)}
        >
          Сохранить
        </Button>
        <Button
          type="text"
          icon={<RollbackOutlined />}
          onClick={() => updateField('isEditing', false, habit)}
        >
          Отмена
        </Button>
      </div>
    </div>
  );
}

export default HabitRowEditable;

HabitRowEditable.propTypes = {
  habit: PropTypes.shape({
    title: PropTypes.string,
    duration: PropTypes.number,
    progress: PropTypes.array,
  }).isRequired,
  updateField: PropTypes.func.isRequired,
};
