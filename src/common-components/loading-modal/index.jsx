import React from 'react'
import { Dialog } from '@material-ui/core'
import { Center, Card, Text, LoadingIcon, Button, Cancel } from './styles'

const LoadingModal = ({ open, text, cancelFn }) => {
  return (
    <Dialog open={open}>
      <Center data-cy='loading-modal'>
        <Card>
          <Text>{text}</Text>
          <LoadingIcon />
          {cancelFn ? (
            <Button onClick={cancelFn}>
              <Cancel>cancel</Cancel>
            </Button>
          ) : null}
        </Card>
      </Center>
    </Dialog>
  )
}

export default LoadingModal
