import React from 'react'
import BasicLayout from '@components/layouts/BasicLayout'
import styled from 'styled-components'
import { media } from '@lib/styles/media'
import { Table } from 'antd'
import { useMyReservation } from '@hooks/useMyReservation'

function MyReservation() {
  const { isLoading, data, columns, totalCount, LIMIT, setOffset } = useMyReservation()

  return (
    <BasicLayout hasBackButton>
      <Block>
        <div className={'my_reservation_title'}>나의 예약 현황</div>
        <div className={'my_reservation_table'}>
          <Table
            loading={isLoading}
            dataSource={data}
            columns={columns}
            pagination={{
              total: totalCount ?? 0,
              pageSize: LIMIT,
              onChange: (pagination) => {
                setOffset(pagination === 1 ? pagination : (pagination - 1) * LIMIT + 1)
              },
            }}
            rowKey={(record) => record.id}
          />
        </div>
      </Block>
    </BasicLayout>
  )
}

export default MyReservation

const Block = styled.div`
  padding: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  .ant-table-cell {
    word-break: break-all;
    padding: 5px;
    text-align: center;
  }

  ${media.mobile} {
    width: 100%;
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
    flex: initial;
    margin-top: 96px;
    .ant-table-cell {
      min-width: 100px;
      padding: 16px;
    }
  }

  .my_reservation_title {
    font-size: 20px;
    font-weight: 700;
  }

  .my_reservation_table {
    margin-top: 20px;
  }
`
