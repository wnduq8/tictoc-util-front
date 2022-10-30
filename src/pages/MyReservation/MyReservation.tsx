import React from 'react'
import BasicLayout from '@components/layouts/BasicLayout'
import styled from 'styled-components'
import { media } from '@lib/styles/media'
import { Table } from 'antd'
import { useMyReservation } from '@hooks/useMyReservation'
import { SpinLoading } from 'antd-mobile'

function MyReservation() {
  const { isLoading, data, columns } = useMyReservation()

  return (
    <BasicLayout hasBackButton>
      <Block>
        <div className={'my_reservation_title'}>나의 예약 현황</div>
        <div className={'my_reservation_table'}>
          {isLoading ? (
            <SpinLoading style={{ '--size': '48px', margin: '10px auto 0' }} color={'#FCD400'} />
          ) : (
            <Table dataSource={data} columns={columns} rowKey={(record) => record.id} />
          )}
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
