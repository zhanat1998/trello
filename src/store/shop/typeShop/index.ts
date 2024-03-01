export type Todo = {
  title: string
  id: number
  description: string
  image: string | null
}

export type InitialStateType = {
  TODOS: Todo[]
  TODO: Todo
  isLoad: boolean
  error: string | undefined
}

export const initialState: InitialStateType = {
  error: '',
  isLoad: false,
  TODOS: [],
  TODO: {
    title: '',
    id: 0,
    description: '',
    image: null,
  },
}
