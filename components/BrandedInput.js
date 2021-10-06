import {
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Button,
  InputRightElement,
  FormHelperText,
  Flex,
} from "@chakra-ui/react";

import { useState } from "react";

const BrandedInput = ({ name, props, isLoading, state, type, helperText }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isRequired id={name} isDisabled={isLoading}>
      {helperText && (
        <FormHelperText pl="0.5rem" pb="0.2rem" opacity="0.7" fontSize="0.7rem">
          {helperText}
        </FormHelperText>
      )}
      <InputGroup>
        <Input
          value={state.value}
          onChange={state.onChange}
          type={type}
          placeholder={name}
          name={name}
          id={name}
          {...props}
        />
        {type === "password" && (
          <InputRightElement>
            <Button
              disabled={isLoading}
              onClick={() => setShowPassword(!showPassword)}
              variant="ghost"
              p="1rem 1.8rem"
              size="sm"
              mr="1.8rem"
              _focus={{ outline: "none" }}
              color="brand.text.light"
            >
              Show
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>wrong</FormErrorMessage>
    </FormControl>
  );
};

export default BrandedInput;
