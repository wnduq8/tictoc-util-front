import { Button, Form, Input, Row, Col, message } from 'antd'
import { validate } from '@lib/validate'
import { useCreateEmailMutation } from '@hooks/mutation/useEmailMutation'
import React from 'react'

function AdminAccount() {
  const { mutateAsync: createEmail, isLoading } = useCreateEmailMutation({
    onSuccess() {
      message.success('이메일 계정이 성공적으로 추가되었습니다.')
    },
    onError() {
      message.error('이메일 계정이 실패하였습니다. 관리자에게 문의해주세요.')
    },
  })

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      onSubmitCapture={(event) => event.preventDefault()}
      onFinish={async (values) => {
        const { email, password, department, name } = values
        if (!validate.tictocEmail(email)) {
          message.warn('이메일 형식은 @tictoccroc.com으로 입력해주세요.')
          return
        }
        if (!validate.koreanName(name)) {
          message.warn('이름은 한글만 입력해주세요.')
          return
        }
        await createEmail({ email, password, department, name })
      }}
    >
      <Row style={{ marginBottom: 10 }}>
        <Col span={4} />
        <Col span={16}>
          이메일 형식은 <span style={{ color: 'red' }}>@tictoccroc.com</span>으로 입력해주세요.
        </Col>
      </Row>
      <Row style={{ marginBottom: 10 }}>
        <Col span={4} />
        <Col span={16}>이름은 한글만 입력해주세요.</Col>
      </Row>
      <Form.Item label="이메일" name="email" rules={[{ required: true, message: '이메일을 입력해주세요' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="비밀번호" name="password" rules={[{ required: true, message: '패스워드를 입력해주세요' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="이름" name="name" rules={[{ required: true, message: '이름을 입력해주세요' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="부서" name="department" rules={[{ required: true, message: '해당 부서를 입력해주세요' }]}>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          계정 추가
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AdminAccount
