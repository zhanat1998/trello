export type ImageType = string | null | undefined

export interface IModel {
  id: string
  text: string
  image: ImageType
  description: string
  isFinished?: boolean
}
export interface exist {
  id: number
  name: string
  picture: string
}

interface initialStateType {
  list: IModel[]
  existingMembers: exist[]
}

export const initialState: IModel[] = []
export const existingMembers = [
  { id: 1, name: 'zhanat', picture: '' },
  { id: 2, name: 'alllo', picture: '' },
  { id: 3, name: 'hdbvhe', picture: '' },
]
// export const initialState: initialStateType = {
//   // list: [],
//   existingMembers: existingMembers,
// }
