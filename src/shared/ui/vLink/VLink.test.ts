import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import VLink from './VLink.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: '<div />' } }],
})

const global = { plugins: [router] }

describe('VLink', () => {
  it('рендерит <a> при передаче href', () => {
    const wrapper = mount(VLink, {
      props: { href: 'https://example.com' },
      global,
    })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('добавляет target="_blank" и rel по умолчанию', () => {
    const wrapper = mount(VLink, {
      props: { href: 'https://example.com' },
      global,
    })
    expect(wrapper.attributes('target')).toBe('_blank')
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
  })

  it('позволяет переопределить target и rel', () => {
    const wrapper = mount(VLink, {
      props: { href: 'https://example.com', target: '_self', rel: 'noopener' },
      global,
    })
    expect(wrapper.attributes('target')).toBe('_self')
    expect(wrapper.attributes('rel')).toBe('noopener')
  })

  it('рендерит RouterLink при передаче to', () => {
    const wrapper = mount(VLink, {
      props: { to: '/' },
      global,
    })
    expect(wrapper.findComponent({ name: 'RouterLink' }).exists()).toBe(true)
  })

  it('рендерит <span> если не передан href и to', () => {
    const wrapper = mount(VLink, { global })
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('рендерит <span> при disabled', () => {
    const wrapper = mount(VLink, {
      props: { href: 'https://example.com', disabled: true },
      global,
    })
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.attributes('href')).toBeUndefined()
  })

  it('добавляет классы disabled', () => {
    const wrapper = mount(VLink, {
      props: { disabled: true },
      global,
    })
    expect(wrapper.classes()).toContain('opacity-50')
    expect(wrapper.classes()).toContain('cursor-not-allowed')
    expect(wrapper.classes()).toContain('pointer-events-none')
  })

  it('устанавливает aria-disabled при disabled', () => {
    const wrapper = mount(VLink, {
      props: { disabled: true },
      global,
    })
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('устанавливает aria-label', () => {
    const wrapper = mount(VLink, {
      props: { href: 'https://example.com', ariaLabel: 'Instagram' },
      global,
    })
    expect(wrapper.attributes('aria-label')).toBe('Instagram')
  })

  it('рендерит слот', () => {
    const wrapper = mount(VLink, {
      props: { href: '#' },
      slots: { default: 'Текст ссылки' },
      global,
    })
    expect(wrapper.text()).toContain('Текст ссылки')
  })

  it('имеет базовые классы', () => {
    const wrapper = mount(VLink, { global })
    expect(wrapper.classes()).toContain('inline-flex')
    expect(wrapper.classes()).toContain('items-center')
    expect(wrapper.classes()).toContain('duration-200')
  })
})
