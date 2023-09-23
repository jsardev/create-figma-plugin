import { h, JSX } from 'preact'
import { useCallback } from 'preact/hooks'

import { Event, EventHandler } from '../../types/event-handler.js'
import { FocusableComponentProps } from '../../types/focusable-component-props.js'
import { createClassName } from '../../utilities/create-class-name.js'
import { createComponent } from '../../utilities/create-component.js'
import { noop } from '../../utilities/no-op.js'
import styles from './range-slider.module.css'

export interface RangeSliderProps
  extends FocusableComponentProps<HTMLInputElement> {
  disabled?: boolean
  increment?: number
  maximum: number
  minimum: number
  onInput?: EventHandler.onInput<HTMLInputElement>
  onNumericValueInput?: EventHandler.onValueChange<number>
  onValueInput?: EventHandler.onValueChange<string>
  value: string
}

export const RangeSlider = createComponent<HTMLInputElement, RangeSliderProps>(
  function (
    {
      blurOnEscapeKeyDown = true,
      disabled = false,
      increment = 1,
      maximum,
      minimum,
      onInput = noop,
      onKeyDown = noop,
      onNumericValueInput = noop,
      onValueInput = noop,
      propagateEscapeKeyDown = true,
      value,
      ...rest
    },
    ref
  ): JSX.Element {
    const handleInput = useCallback(
      function (event: Event.onInput<HTMLInputElement>) {
        onInput(event)
        const value = event.currentTarget.value
        onValueInput(value)
        onNumericValueInput(parseFloat(value))
      },
      [onInput, onNumericValueInput, onValueInput]
    )

    const handleKeyDown = useCallback(
      function (event: Event.onKeyDown<HTMLInputElement>): void {
        onKeyDown(event)
        if (event.key !== 'Escape') {
          return
        }
        if (propagateEscapeKeyDown === false) {
          event.stopPropagation()
        }
        if (blurOnEscapeKeyDown === true) {
          event.currentTarget.blur()
        }
      },
      [blurOnEscapeKeyDown, onKeyDown, propagateEscapeKeyDown]
    )

    return (
      <label
        class={createClassName([
          styles.rangeSlider,
          disabled === true ? styles.disabled : null
        ])}
      >
        <input
          {...rest}
          ref={ref}
          class={styles.input}
          disabled={disabled}
          max={maximum}
          min={minimum}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          step={increment}
          type="range"
          value={value}
        />
        <div class={styles.border} />
      </label>
    )
  }
)
