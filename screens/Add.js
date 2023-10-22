import { Text, View } from 'react-native';

import styles from '../styles/style';

const Add = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add</Text>
      <Text>Formulário para adicionar uma refeição</Text>
    </View>
  );
};

export default Add;
