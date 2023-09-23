import { ComponentChild, ComponentChildren, h, JSX, toChildArray } from 'preact'

import { Space } from '../../types/space.js'
import { createComponent } from '../../utilities/create-component.js'
import styles from './stack.module.css'

export type StackProps = {
  children: ComponentChildren
  space: StackSpace
}
export type StackSpace = Space

export const Stack = createComponent<HTMLDivElement, StackProps>(function (
  { children, space, ...rest },
  ref
): JSX.Element {
  return (
    <div {...rest} ref={ref} class={styles[space]}>
      {toChildArray(children).map(function (
        element: ComponentChild,
        index: number
      ): JSX.Element {
        return (
          <div key={index} class={styles.child}>
            {element}
          </div>
        )
      })}
    </div>
  )
})
