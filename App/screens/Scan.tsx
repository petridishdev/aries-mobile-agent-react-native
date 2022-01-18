import type { BarCodeReadEvent } from 'react-native-camera'

import { ConnectionState } from '@aries-framework/core'
import { useAgent, useConnectionById } from '@aries-framework/react-hooks'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { parseUrl } from 'query-string'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'

import { QRScanner } from 'components'
import { TabStackParams } from 'types/navigators'
// eslint-disable-next-line import/no-cycle

interface ScanProps {
  navigation: BottomTabNavigationProp<TabStackParams, 'ScanTab'>
}

const Scan: React.FC<ScanProps> = ({ navigation }) => {
  const { agent } = useAgent()
  const { t } = useTranslation()

  const [connectionId, setConnectionId] = useState('')
  const connection = useConnectionById(connectionId)

  const isRedirecton = (url: string): boolean => {
    const queryParams = parseUrl(url).query
    return !(queryParams['c_i'] || queryParams['d_m'])
  }

  useEffect(() => {
    if (connection?.state === ConnectionState.Complete) {
      Toast.show({
        type: 'success',
        text1: t('Scan.ConnectionAccepted'),
      })
      navigation.navigate('HomeTab')
    }
  }, [connection])

  const handleCodeScan = async (event: BarCodeReadEvent) => {
    Toast.show({
      type: 'info',
      text1: t('Scan.AcceptingConnection'),
    })

    try {
      const url = event.data

      if (isRedirecton(url)) {
        const res = await fetch(event.data, {
          method: 'GET',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        })

        const message = await res.json()
        await agent?.receiveMessage(message)
      } else {
        const connectionRecord = await agent?.connections.receiveInvitationFromUrl(url, {
          autoAcceptConnection: true,
        })

        if (!connectionRecord?.id) {
          throw new Error(t('Scan.ConnectionNotFound'))
        }

        setConnectionId(connectionRecord.id)
      }

      Toast.show({
        type: 'success',
        text1: t('Scan.ConnectionAccepted'),
      })

      navigation.navigate('HomeTab')
    } catch (e: unknown) {
      Toast.show({
        type: 'error',
        text1: (e as Error)?.message || t('Global.Failure'),
      })

      navigation.goBack()
    }
  }

  return (
    <View>
      <QRScanner handleCodeScan={handleCodeScan} />
    </View>
  )
}

export default Scan
