export type Todo = {
  title: string
  id: string
  description: string
  image: string | null
}
export type List = {
  id: string
  name: string
  todos: Todo[]
}
export type InitialStateType = {
  TODOS: Todo[]
  TODO: Todo
  isLoad: boolean
  error: string | undefined
  lists: List[]
}

const mockList: List[] = [
  {
    id: '1',
    name: 'List 1',
    todos: [],
  },
  {
    id: '2',
    name: 'List 2',
    todos: [],
  },
  {
    id: '3',
    name: 'List 3',
    todos: [],
  },
]

export const initialState: InitialStateType = {
  error: '',
  isLoad: false,
  TODOS: [],
  TODO: {
    title: '',
    id: '',
    description: '',
    image: null,
  },
  // TODO: use singular form of list
  lists: mockList,
}
