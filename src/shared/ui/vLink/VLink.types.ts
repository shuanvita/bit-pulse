import type { RouteLocationRaw } from 'vue-router'

export interface VLinkBase {
  icon?: string
  preIcon?: string
  postIcon?: string
  iconSize?: number
  ariaLabel?: string
  disabled?: boolean
}

export interface ExternalLink extends VLinkBase {
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  to?: never
}

export interface InternalLink extends VLinkBase {
  to: RouteLocationRaw
  href?: never
  target?: never
  rel?: never
}

export interface Span extends VLinkBase {
  href?: never
  to?: never
  target?: never
  rel?: never
}

export type VLinkTypes = ExternalLink | InternalLink | Span
