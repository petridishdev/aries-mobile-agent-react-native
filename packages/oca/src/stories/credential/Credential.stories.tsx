import { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { LocalizedAttribute, LocalizedCredential } from '@oca/formatters'
import Credential from '@ui/components/credential/CredentialCard'
import { LocalizedCredentialContext } from '@ui/contexts/localizedCredential'

const meta = {
  title: 'Credential/Card',
  component: () => {
    return (
      <LocalizedCredentialContext.Provider
        value={
          {
            issuer: 'Government of British Columbia',
            name: 'Selling It Right',
            logo: 'https://raw.githubusercontent.com/bcgov/aries-oca-bundles/main/OCABundles/schema/bcgov-digital-trust/LCRB/selling-it-right/bc-logo.jpg',
            backgroundImageSlice:
              'https://www.responsibleservicebc.gov.bc.ca/files/static/bc_wallet_vc_lcrb_image_slice_sell_right.jpg',
            primaryBackgroundColor: '#003366',
            secondaryBackgroundColor: '#FCBC1E',
            watermark: 'NON-PRODUCTION',
            primaryAttribute: {
              name: 'name',
              label: 'Name',
              value: 'John Doe',
              type: 'string',
            } as Partial<LocalizedAttribute>,
            secondaryAttribute: {
              name: 'email',
              label: 'Email',
              value: 'asdf@asdf.com',
              type: 'string',
            } as Partial<LocalizedAttribute>,
          } as LocalizedCredential
        }
      >
        <Credential />
      </LocalizedCredentialContext.Provider>
    )
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Credential>

export default meta

type Story = StoryObj<typeof Credential>

export const Basic = {} satisfies Story
