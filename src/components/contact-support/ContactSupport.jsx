import React from 'react'
import { SupportProvider } from 'context/SupportContext'
import Upper from './components/Upper'
import Message from './components/Message'
import Modals from './components/Modals'
import { StyledPaper } from './styles'
import SEO from 'utils/seo'

const ContactSupportComponent = () => {
  return (
    <React.Fragment>
      <SEO title='Contact Support' />
      <StyledPaper>
        <Upper />
        <Message />
        <Modals />
      </StyledPaper>
    </React.Fragment>
  )
}

const ContactSupport = props => {
  return (
    <SupportProvider>
      <ContactSupportComponent {...props} />
    </SupportProvider>
  )
}

export default ContactSupport
