import * as yup from 'yup';

export const createTodoInputSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
});
