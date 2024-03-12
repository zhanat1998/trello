import { AnyAction } from '@reduxjs/toolkit'
import { StoreDispatch } from '../redux/store'

export type ImageType = string | null | undefined

export interface IModel {
  id: string
  text: string
  image: ImageType
  description: string
  isFinished?: boolean
}
