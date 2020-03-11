import React, { useContext } from 'react'
import { MenuItem, Grid, Button } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { InputField } from 'common-components'
import { store } from 'context/UserManagementContext'

const HeaderToolBar = () => {
  const {
    state: { users, search, filter },
    dispatch
  } = useContext(store)

  return (
    <Grid
      container
      spacing={4}
      alignItems="flex-end"
      style={{ marginBottom: 16 }}
    >
      <Grid item sm={4}>
        <InputField
          fullWidth
          label="Search by name"
          InputProps={{
            endAdornment: <Search style={{ color: '#CCC' }} />
          }}
          value={search}
          onChange={e => {
            if (e.target.value) {
              dispatch({ type: 'SET_PAGE', payload: { page: 0 } })
              dispatch({
                type: 'SET_COUNT',
                payload: {
                  count: users.filter(user =>
                    user.name.match(new RegExp(e.target.value, 'i'))
                  ).length
                }
              })
            }
            dispatch({
              type: 'HANDLE_SEARCH',
              payload: { search: e.target.value }
            })
          }}
        />
      </Grid>
      <Grid item sm={3}>
        <InputField
          select
          fullWidth
          label="Status"
          value={filter.status}
          onChange={e =>
            dispatch({
              type: 'SET_FILTER',
              payload: { filter: { ...filter, status: e.target.value } }
            })
          }
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="request">Request</MenuItem>
        </InputField>
      </Grid>
      <Grid item sm={3}>
        <InputField
          select
          fullWidth
          label="Type"
          value={filter.type}
          onChange={e =>
            dispatch({
              type: 'SET_FILTER',
              payload: { filter: { ...filter, type: e.target.value } }
            })
          }
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </InputField>
      </Grid>
      <Grid item sm={2} container justify="flex-end">
        <Button
          onClick={() => dispatch({ type: 'RESET_FILTER' })}
          className="add-btn"
        >
          Reset Filter
        </Button>
      </Grid>
    </Grid>
  )
}

export default HeaderToolBar
