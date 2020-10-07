export default () => ({
  data: [
    {
      type: 'personal',
      title: 'Мои привычки',
      id: 1,
      habits: [
        {
          id: 1,
          title: 'Выспаться',
          progress: [1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0],
          duration: 30,
          dateStart: '2020-09-27',
          state: 'active',
        },
        {
          id: 2,
          title: 'Подучить React',
          progress: [1, 1, 0, 0],
          duration: 30,
          dateStart: '2020-09-27',
          state: 'active',
        },
        {
          id: 3,
          title: 'Подлечиться',
          progress: [1, 1, 0, 0, 1, 1, 0],
          duration: 30,
          dateStart: '2020-09-27',
          state: 'active',
        },
      ],
    },
  ],
  status: 200,
});
