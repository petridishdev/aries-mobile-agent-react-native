import { ImageSourcePropType } from 'react-native'

export const toImageSource = (source: unknown): ImageSourcePropType => {
  if (typeof source === 'string') {
    return { uri: source as string }
  }
  return source as ImageSourcePropType
}

export const isDataUrl = (value: string | number | null) => {
  return typeof value === 'string' && value.startsWith('data:image/')
}
