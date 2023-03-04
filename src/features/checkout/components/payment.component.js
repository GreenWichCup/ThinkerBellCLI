import React from "react";
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { FormProvider, useForm } from 'react-hook-form'
import LottieView from 'lottie-react-native'
import CreditCardForm from 'rn-credit-card'
import { color } from "react-native-reanimated";

export const CreditCardComponent = () => {
  const formMethods = useForm({
    // to trigger the validation on the blur event
    mode: 'onBlur',
    defaultValues: {
      holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  })
  const { handleSubmit, formState } = formMethods;
  const onSubmit = (model) => {
    Alert.alert('Success: ' + JSON.stringify(model, null, 2));
  };
  return (
    <FormProvider {...formMethods}>
      <SafeAreaView >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <CreditCardForm
            formOnly={true}
            overrides={{
              input: {
                height: 56,
                color: "black",
                paddingStart: 8,
                paddingBottom: 0,
                paddingTop: 0,
                paddingBottom: 0,

              }
            }}
            LottieView={LottieView}
          />
        </KeyboardAvoidingView>
        {formState.isValid && (
          <Button
            style={styles.button}
            title={'CONFIRM PAYMENT'}
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </SafeAreaView>
    </FormProvider>
  )
}


const styles = StyleSheet.create({
  cardForm: {
    height: 50,
  },
  cardFieldInputs: {
    textColor: 'blue',
    backgroundColor: "#FFFFFF",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    color: "black",
  },
  container: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    PaddingLeft: 8,
    PaddingRight: 8
  },
  avoider: {
    flex: 1,
    padding: 8,
  },
  button: {
    margin: 8,
    marginTop: 0,
  },

})