import { CredentialExchangeRecord, CredentialPreviewAttribute } from '@credo-ts/core'

import { OverlayBundle } from '../../types'

import DisplayAttribute from './DisplayAttribute'

export default class LocalizedCredential {
  #bundle!: OverlayBundle

  attributes!: DisplayAttribute[]
  issuer: string
  name: string
  watermark?: string

  constructor(bundle: OverlayBundle, record: CredentialExchangeRecord, language: string) {
    if (!language) {
      throw new Error('language is required')
    }

    this.#bundle = bundle

    this.issuer = bundle.metadata.issuer?.[language]
    this.name = bundle.metadata.name?.[language]
    this.watermark = bundle.metadata?.watermark?.[language]

    // If no record attributes are present then grab default attributes from the bundle
    const credentialAttributes = record.credentialAttributes?.length
      ? record.credentialAttributes
      : bundle.attributes.map((attribute) => {
          return new CredentialPreviewAttribute({ ...attribute, value: '' })
        })

    this.attributes =
      credentialAttributes
        ?.filter((attribute) => bundle.getAttribute(attribute.name))
        .map((attribute) => new DisplayAttribute(attribute, { name: attribute.name, type: '' }, language)) ?? []
  }

  get primaryAttribute(): DisplayAttribute | undefined {
    const name = this.#bundle.branding?.primaryAttribute
    return this.getAttribute(name)
  }

  get secondaryAttribute(): DisplayAttribute | undefined {
    const name = this.#bundle.branding?.secondaryAttribute
    return this.getAttribute(name)
  }

  get logo(): string | undefined {
    return this.#bundle.branding?.logo
  }

  get primaryBackgroundColor(): string | undefined {
    return this.#bundle.branding?.primaryBackgroundColor
  }

  get secondaryBackgroundColor(): string | undefined {
    return this.#bundle.branding?.secondaryBackgroundColor
  }

  get backgroundImageSlice(): string | undefined {
    return this.#bundle.branding?.backgroundImageSlice
  }

  private getAttribute(attributeName?: string): DisplayAttribute | undefined {
    if (!attributeName) {
      return undefined
    }
    return this.attributes.find((attribute) => attribute.name === attributeName)
  }
}
