import {
  CheckSquareFilled,
  DeleteFilled,
  DiffFilled,
  ProductFilled,
  SignalFilled,
  WalletFilled
} from '@ant-design/icons'
import { Col, Layout, Row } from 'antd'
import {
  LineChartOptions,
  LineChartSeries,
  PieChartOptions,
  PieChartSeries
} from '../../components/Seller/DBChart/ChartConfig.jsx'
import DBChart from '../../components/Seller/DBChart/DBChart.jsx'
import Widget from '../../components/Seller/Widget/index.js'

const { Content } = Layout

export default function SellerDashBoard() {
  return (
    <Content>
      <Row gutter={[20]}>
        <Col sm={24} md={12} xl={8}>
          <Widget
            icon={<ProductFilled className='text-primary-500 text-3xl' />}
            title={'Product Sales'}
            subtitle={'176'}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Widget
            icon={<SignalFilled className='text-primary-500 text-3xl' />}
            title={'Earnings'}
            subtitle={'$340.4'}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Widget
            icon={<WalletFilled className='text-primary-500 text-3xl' />}
            title={'My Balance'}
            subtitle={'$882.5'}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Widget
            icon={<DiffFilled className='text-primary-500 text-3xl' />}
            title={'Pending Orders'}
            subtitle={'12'}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Widget
            icon={<CheckSquareFilled className='text-primary-500 text-3xl' />}
            title={'Completed Orders'}
            subtitle={'23'}
          />
        </Col>
        <Col sm={24} md={12} xl={8}>
          <Widget
            icon={<DeleteFilled className='text-primary-500 text-3xl' />}
            title={'Cancelled Orders'}
            subtitle={'2'}
          />
        </Col>
      </Row>
      <Row gutter={20}>
        <Col sm={24} md={16} xl={16}>
          <DBChart
            options={LineChartOptions}
            series={LineChartSeries}
            type='line'
            height={400}
            title='Sales Overview'
          />
        </Col>
        <Col sm={24} md={8} xl={8}>
          <DBChart options={PieChartOptions} series={PieChartSeries} type='pie' height={410} title='Product Status' />
        </Col>
      </Row>
    </Content>
  )
}
