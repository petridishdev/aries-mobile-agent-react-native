import { CredentialState, ProofState } from '@aries-framework/core'
import { useCredentialByState, useProofByState } from '@aries-framework/react-hooks'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, StyleSheet, View } from 'react-native'

import { Colors } from '../Theme'

import { Button, ModularView, NotificationCredentialListItem, NotificationProofListItem, Text } from 'components'
import { HomeStackParams } from 'types/navigators'

interface Props {
  navigation: StackNavigationProp<HomeStackParams, 'Home'>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    height: '100%',
    alignItems: 'center',
  },
})

const Home: React.FC<Props> = ({ navigation }) => {
  const credentials = useCredentialByState(CredentialState.OfferReceived)
  const proofs = useProofByState(ProofState.RequestReceived)
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <ModularView
        title={t('Home.Notifications')}
        content={
          <FlatList
            data={[...credentials, ...proofs]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              item.type === 'CredentialRecord' ? (
                <NotificationCredentialListItem notification={item} />
              ) : (
                <NotificationProofListItem notification={item} />
              )
            }
            ListEmptyComponent={<Text>{t('Home.NoNewUpdates')}</Text>}
          />
        }
      />
      <Button
        outlined
        neutral
        title={t('Home.ManageYourWallet')}
        accessibilityLabel={t('Home.ManageYourWallet')}
        onPress={() => navigation.navigate('Manage Your Wallet')}
      ></Button>
    </View>
  )
}

export default Home
