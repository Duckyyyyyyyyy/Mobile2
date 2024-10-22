/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');

  // Function to handle number inputs
  const handleNumberInput = (num: any) => {
    if (displayValue === '0') {
      setDisplayValue(num.toString());
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  // Function to handle operator inputs
  const handleOperatorInput = (operator: any) => {
    setOperator(operator);
    setFirstValue(displayValue);
    setDisplayValue('0');
  };

  // Function to handle equal button press
  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);
    if (operator === '+') {
      setDisplayValue((num1 + num2).toString());
    } else if (operator === '-') {
      setDisplayValue((num1 - num2).toString());
    } else if (operator === '*') {
      setDisplayValue((num1 * num2).toString());
    } else if (operator === '/') {
      setDisplayValue((num1 / num2).toString());
    }
    setOperator(null);
    setFirstValue('');
  };

  // Function to handle clear button press
  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text>{displayValue}</Text>
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <Button title="7" onPress={() => handleNumberInput(7)} />
        </View>
        <View style={styles.gridItem}>
          <Button title="8" onPress={() => handleNumberInput(8)} />
        </View>
        <View style={styles.gridItem}>
          <Button title="9" onPress={() => handleNumberInput(9)} />
        </View>
        <View style={styles.gridItem}>
          <Button title="/" onPress={() => handleOperatorInput('/')} />
        </View>

        <View style={styles.gridItem}>
          <Button title="4" onPress={() => handleNumberInput(4)} />
        </View>
        <View style={styles.gridItem}>
          <Button title="5" onPress={() => handleNumberInput(5)} />
        </View>
        <View style={styles.gridItem}>
          <Button title="6" onPress={() => handleNumberInput(6)} />
        </View>
        <View style={styles.gridItem}>
          <Button title="X" onPress={() => handleOperatorInput('*')} />
        </View>

        <View style={styles.gridItem}>
          <Button title="1" onPress={() => handleNumberInput(1)} />
        </View>
        <View style={styles.gridItem}>
          <Button title="2" onPress={() => handleNumberInput(2)} />
        </View>
        <View style={styles.gridItem}>
          <Button title="3" onPress={() => handleNumberInput(3)} />
        </View>
        <View style={styles.gridItem}>
          <Button title="-" onPress={() => handleOperatorInput('-')} />
        </View>

        <View style={{width: 120, height: 50, paddingTop: 10, marginRight: 5}}>
          <Button title="0" onPress={() => handleNumberInput(0)} />
        </View>
        <View style={(styles.gridItem, {marginLeft: 50, paddingTop: 10})}>
          <Button title="=" onPress={handleEqual} />
        </View>
        <View style={(styles.gridItem, {marginLeft:65, paddingTop: 10})}>
          <Button title="+" onPress={() => handleOperatorInput('+')} />
        </View>
      </View>
      <Button title="C" onPress={handleClear} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 8,
  },
  displayContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
});

export default App;
