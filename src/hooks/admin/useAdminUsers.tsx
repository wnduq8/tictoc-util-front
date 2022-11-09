import React, { useCallback, useMemo, useState } from 'react'
import { IUser } from '@lib/api/admin/users/getAdminUsers'
import { useAdminUsersQuery } from '@hooks/admin/query/useAdminUsersQuery'
import { dateFormat, LIMIT, timeFormat } from '@lib/constants'
import { ColumnsType } from 'antd/es/table'
import { Button, Tag } from 'antd'
import moment from 'moment'
import { useReserByUserModalState } from '@src/atoms/admin/reservationByUserModalState'

interface DataType {
  key: React.Key
}

export function useAdminUsers() {
  const [offset, setOffset] = useState<number>(1)
  const [_, setReserByUserModal] = useReserByUserModalState()
  const { data: users, isLoading } = useAdminUsersQuery({ offset, limit: LIMIT }, { cacheTime: 0 })

  const onReserHistoryShowBtn = useCallback((user: IUser) => {
    setReserByUserModal({ open: true, data: user })
  }, [])

  const columns: ColumnsType<IUser & DataType> = useMemo(
    () => [
      {
        title: '이름',
        dataIndex: 'name',
      },
      {
        title: '부서',
        dataIndex: 'department',
      },
      {
        title: '이메일',
        dataIndex: 'email',
      },
      {
        title: '어드민 권한 여부',
        dataIndex: 'isAdmin',
        render: (bol: boolean) => {
          return bol ? <Tag color={'cyan'}>어드민</Tag> : null
        },
      },
      {
        title: '구글 계정',
        dataIndex: 'isGoogle',
        render: (bol: boolean) => {
          const text = bol ? '구글' : '이메일'
          return <Tag color={bol ? 'volcano' : 'purple'}>{text}</Tag>
        },
      },
      {
        title: '추가정보 입력 여부',
        dataIndex: 'status',
        render: (status: 'A' | 'N') => {
          const text = status === 'A' ? '완료' : '미완료'
          return <Tag color={status === 'A' ? 'magenta' : 'orange'}>{text}</Tag>
        },
      },
      {
        title: '생성 일자',
        dataIndex: 'createAt',
        render: (date: Date) => {
          return <span>{moment(date).format(`${dateFormat} ${timeFormat}`)}</span>
        },
      },
      {
        title: '삭제 일자',
        dataIndex: 'deletedAt',
        render: (date: Date | null) => {
          return <span>{date ? moment(date).format(`${dateFormat} ${timeFormat}`) : null}</span>
        },
      },
      {
        key: 'reservation',
        title: '예약내역 보기',
        dataIndex: 'reservation',
        fixed: 'right',
        width: 120,
        render: (_: any, user) => {
          return (
            <Button color={'primary'} onClick={() => onReserHistoryShowBtn(user)}>
              보기
            </Button>
          )
        },
      },
    ],
    [],
  )

  const data = useMemo(() => {
    return users?.data?.data!.map((user) => {
      return {
        ...user,
        key: user.id,
      }
    })
  }, [users])

  const totalCount = useMemo(() => users?.data.totalCount, [users])

  return { columns, data, totalCount, isLoading, setOffset }
}
