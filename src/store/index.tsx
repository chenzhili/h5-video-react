import * as React from 'react'
import { createContext, useReducer } from 'react'
import Volume from 'src/components/volume';

type IAction = ISetPlay | ISetDuration | ISetCurrentTime |
  ISetDrag | ISetShowControls | ISetMuted | ISetIsFullScreen | ISetShowVolume | ISetVolume

interface ISetPlay {
  type: string
  payload: IStore['isPlay']

}
interface ISetDuration {
  type: string
  payload: IStore['duration']
}
interface ISetCurrentTime {
  type: string
  payload: IStore['currentTime']
}

interface ISetDrag {
  type: string
  payload: IStore['drag']
}
interface ISetShowPoster {
  type: string
  payload: IStore['showPoster']
}

interface ISetShowControls {
  type: string
  payload: IStore['showControls']
}
interface ISetMuted {
  type: string
  payload: IStore['muted']
}

interface ISetIsFullScreen {
  type: string
  payload: IStore['isFullScreen']
}
interface ISetShowVolume {
  type: string
  payload: IStore['showVolume']
}
interface ISetVolume {
  type: string
  payload: IStore['volume']
}
interface IStore {
  isPlay: boolean
  duration: number
  currentTime: number
  drag: boolean
  showPoster: boolean
  showControls: boolean
  muted: boolean
  isFullScreen: boolean
  showVolume: boolean,
  volume: number
}

interface StoreContext {
  state: Partial<IStore>
  dispatch(param: ISetPlay): void
  dispatch(param: ISetDuration): void
  dispatch(param: ISetCurrentTime): void
  dispatch(param: ISetDrag): void
  dispatch(param: ISetShowPoster): void
  dispatch(param: ISetShowControls): void
  dispatch(param: ISetMuted): void
  dispatch(param: ISetIsFullScreen): void
  dispatch(param: ISetShowVolume): void
  dispatch(param: ISetVolume): void
}

export function playerReducer(draft: IStore, action: IAction): any {
  const { payload } = action
  switch (action.type) {
    case 'playStatus': {
      return { ...draft, isPlay: payload }
    }
    case 'isFullScreen': {
      return { ...draft, isFullScreen: payload }
    }
    case 'duration': {
      return { ...draft, duration: payload }
    }
    case 'drag': {
      return { ...draft, drag: payload }
    }
    case 'currentTime': {
      return { ...draft, currentTime: payload }
    }
    case 'showPoster': {
      return { ...draft, showPoster: payload }
    }
    case 'showControls': {
      return { ...draft, showControls: payload }
    }
    case 'muted': {
      return { ...draft, muted: payload }
    }
    case 'showVolume': {
      return { ...draft, showVolume: payload }
    }
    case 'volume': {
      return { ...draft, volume: payload }
    }
    default:
      return;
  }
}

const initialState: IStore = {
  isPlay: false,
  duration: 0,
  currentTime: 0,
  drag: false,
  showPoster: true,
  showControls: true,
  muted: false,
  isFullScreen: false,
  showVolume: false,
  volume: 0.6
}

export const GlobalStoreContext = createContext<StoreContext>({
  state: initialState,
  dispatch: () => { },
})

export const GlobalStoreProvider = (props: { children: React.ReactNode }) => {
  const { children } = props
  const [state, dispatch] = useReducer(playerReducer, initialState)
  return (
    <GlobalStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStoreContext.Provider>
  )
}
export default { GlobalStoreProvider, GlobalStoreContext }