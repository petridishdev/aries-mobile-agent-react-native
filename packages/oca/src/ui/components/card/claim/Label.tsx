import { contrastColor } from '@oca/utils'
import { useCredentialTheme } from '@ui/contexts/credentialTheme'
import { useLocalizedCredential } from '@ui/contexts/localizedCredential'
import startCase from 'lodash.startcase'
import { Text, StyleSheet } from 'react-native'

interface LabelProps extends React.PropsWithChildren {
  label: string
}

const Label: React.FC<LabelProps> = ({ label }) => {
  const { text } = useCredentialTheme()
  const localizedCredential = useLocalizedCredential()

  const styles = StyleSheet.create({
    container: {
      marginTop: 15,
      color: contrastColor(localizedCredential?.primaryBackgroundColor),
      flexShrink: 1,
    },
  })

  return (
    <Text
      style={[
        text.labelNormal,
        styles.container,
        {
          lineHeight: 19,
          opacity: 0.8,
        },
      ]}
      // testID={testIdWithKey('AttributeName')}
    >
      {label ?? startCase(label)}
    </Text>
  )
}

export default Label
