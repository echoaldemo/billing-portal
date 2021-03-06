import React, { useContext, useState } from 'react'
import { TrashBinContext } from 'context/TrashBinContext'
import { Row, RowHeader } from 'common-components'
import { formatter } from 'utils/func'
import RestoreIcon from '@material-ui/icons/Restore'
import { IconButton, Tooltip } from '@material-ui/core'
import { StateContext } from 'context/StateContext'
import { postLog } from 'utils/time'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import EllipsisText from 'react-ellipsis-text'
import { CopyToClipboard } from 'react-copy-to-clipboard'
export default function TrashBinItems() {
  const [copy, setCopy] = useState(false)
  const {
    state: { data },
    updateTrashItem
  } = useContext(TrashBinContext)
  const { state: profile } = useContext(StateContext)
  return (
    <div>
      <RowHeader rowHeaderData={headerData} />
      {data.map((item, i) => {
        const { id, invoiceType, billingType, company, startDate, total } = item
        return (
          <Row
            style={{ borderBottom: 'solid 1px #F1F1f1' }}
            key={i}
            rowData={[
              {
                size: 2,
                style: {
                  padding: 0
                },
                label: (
                  <React.Fragment>
                    <CopyToClipboard
                      text={id}
                      onCopy={() => {
                        setCopy(true)
                      }}
                      onPointerLeave={() => {
                        setCopy(false)
                      }}
                    >
                      <Tooltip
                        title={copy ? 'UUID copied!' : 'Copy UUID'}
                        placement='top'
                      >
                        <FileCopyOutlinedIcon
                          style={{ fontSize: 15, cursor: 'pointer' }}
                        />
                      </Tooltip>
                    </CopyToClipboard>
                    &nbsp;&nbsp;
                    <Tooltip title={id} placement='top'>
                      <EllipsisText text={id} length={16} />
                    </Tooltip>
                  </React.Fragment>
                )
              },
              {
                size: 2,
                label: invoiceType,
                style: { textAlign: 'right' }
              },
              {
                size: 1,
                label: billingType === 1 ? 'Monthly' : 'Weekly',
                style: { textAlign: 'right' }
              },
              {
                size: 2,
                label: (
                  <Tooltip title={company ? company.name : ''}>
                    <EllipsisText
                      text={company ? company.name : ''}
                      length={10}
                    />
                  </Tooltip>
                ),
                style: { textAlign: 'right' }
              },
              {
                size: 2,
                label: startDate,
                style: { textAlign: 'right' }
              },
              {
                size: 2,
                label: formatter.format(total),
                style: { textAlign: 'right' }
              },
              {
                size: 1,
                label: (
                  <Tooltip title='Restore invoice'>
                    <IconButton
                      style={{ padding: 5 }}
                      onClick={() => {
                        updateTrashItem(id)
                        postLog({
                          type: 'restore-invoice',
                          description: `${profile.userProfile.name} restored invoice #${id}.`,
                          invoiceId: id
                        })
                      }}
                    >
                      <RestoreIcon />
                    </IconButton>
                  </Tooltip>
                ),
                style: { textAlign: 'center' }
              }
            ]}
          />
        )
      })}
    </div>
  )
}

const headerData = [
  { size: 2, label: 'Invoice' },
  { size: 2, label: 'Invoice Type', style: { textAlign: 'right' } },
  { size: 1, label: 'Type', style: { textAlign: 'right' } },
  { size: 2, label: 'Company', style: { textAlign: 'right' } },
  { size: 2, label: 'Date Created', style: { textAlign: 'right' } },
  { size: 2, label: 'Total', style: { textAlign: 'right' } },
  { size: 1, label: ' ', style: { textAlign: 'center' } }
]
