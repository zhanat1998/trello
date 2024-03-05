export type Todo = {
  title: string
  id: string
  description: string
  image: string | null
}
export type List = {
  id: string
  name: string
  cards: Todo[]
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
    cards: [
      {
        id: 'a',
        title: 'Card1',
        description: '',
        image: '',
      },
      {
        id: 'b',
        title: 'Card2',
        description: '',
        image: '',
      },
    ],
  },
  {
    id: '2',
    name: 'List 2',
    cards: [
      {
        id: 'c',
        title: 'Card3',
        description: '',
        image: '',
      },
      {
        id: 'd',
        title: 'Card4',
        description: '',
        image: '',
      },
    ],
  },
  {
    id: '3',
    name: 'List 3',
    cards: [
      {
        id: 'e',
        title: 'Card5',
        description: '',
        image: '',
      },
      {
        id: 'f',
        title: 'Card6',
        description: '',
        image: '',
      },
    ],
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
  lists: mockList,
}
