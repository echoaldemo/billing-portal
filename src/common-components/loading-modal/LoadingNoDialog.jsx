import React from "react";
import { Center, Card, Text, LoadingIcon, Button, Cancel } from "./styles";

const LoadingNoDialog = ({ text, cancelFn }) => {
  return (
    <Center data-cy="loading-modal">
      <Card>
        <Text>{text}</Text>
        <LoadingIcon />
        <Button onClick={cancelFn}>
          <Cancel>cancel</Cancel>
        </Button>
      </Card>
    </Center>
  );
};

export default LoadingNoDialog;
