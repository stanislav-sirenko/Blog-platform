import { Alert, Space } from 'antd'

const NotFoundPage: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Alert message="This page doesn't exist" type="error" />
  </Space>
)

export default NotFoundPage
