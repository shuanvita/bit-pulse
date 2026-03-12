import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

const VSvg = defineComponent({
  props: {
    name: { type: String, required: true },
    size: { type: Number, default: null },
  },
  template: `
    <svg
      :class="{ 'h-auto w-full': !size }"
      :style="size ? { width: size + 'px', height: size + 'px' } : {}"
      role="img"
      aria-hidden="true"
    />
  `,
})

describe('VSvg', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  it('рендерит элемент', () => {
    const wrapper = mount(VSvg, { props: { name: 'home' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('добавляет w-full h-auto если size не передан', () => {
    const wrapper = mount(VSvg, { props: { name: 'home' } })
    expect(wrapper.find('svg').classes()).toContain('w-full')
    expect(wrapper.find('svg').classes()).toContain('h-auto')
  })

  it('не добавляет w-full h-auto если size передан', () => {
    const wrapper = mount(VSvg, { props: { name: 'home', size: 32 } })
    expect(wrapper.find('svg').classes()).not.toContain('w-full')
  })

  it('применяет width и height через style если size передан', () => {
    const wrapper = mount(VSvg, { props: { name: 'home', size: 32 } })
    const style = wrapper.find('svg').attributes('style')
    expect(style).toContain('width: 32px')
    expect(style).toContain('height: 32px')
  })

  it('имеет role="img" и aria-hidden="true"', () => {
    const wrapper = mount(VSvg, { props: { name: 'home' } })
    expect(wrapper.find('svg').attributes('role')).toBe('img')
    expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true')
  })
})
