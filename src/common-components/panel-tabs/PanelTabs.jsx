import React from 'react'
import { Box, Tab, Typography } from '@material-ui/core'
import { Cont, TabsStyled } from './styles'

const PanelTabs = ({ labels, tab, setTab }) => {
  const handleChange = (e, newValue) => {
    setTab(newValue)
  }

  return (
    <Cont>
      <TabsStyled value={tab} onChange={handleChange} orientation="vertical">
        {labels.map((label, i) => (
          <Tab label={label} key={i} />
        ))}
      </TabsStyled>
    </Cont>
  )
}

const Panel = ({ children, value, index, ...other }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box style={{ padding: 0 }} p={3}>
        {children}
      </Box>
    </Typography>
  )
}

export { PanelTabs, Panel }
