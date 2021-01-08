import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Row, Col, Divider, Avatar, Upload, Button, Tabs, Input} from "antd";
import { UserOutlined } from '@ant-design/icons';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';


const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class UserInfoPage extends React.Component {
    render() {
        return (

            <>
                <br/>
                <br/>
                <Row>
                    <Col span={4}>
                    </Col>
                    <Col span={16}>
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="信息查看" key="1" size="large">
                                <Divider plain>基本信息</Divider>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        姓名
                                    </Col>
                                    <Col>
                                        刘小米
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        头像
                                    </Col>
                                    <Col>
                                        <div>
                                            <Avatar size={128} icon={<UserOutlined/>}/>
                                        </div>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        平台角色
                                    </Col>
                                    <Col>
                                        学生
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        人员编号
                                    </Col>
                                    <Col>
                                        3180000000
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        系级
                                    </Col>
                                    <Col>
                                        计算机科学与技术学院
                                    </Col>
                                </Row>
                                <br/>
                                <Divider plain>账号绑定</Divider>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        Email
                                    </Col>
                                    <Col>
                                        3180000000@zju.edu.cn
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        手机号码
                                    </Col>
                                    <Col>
                                        13700000000
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="信息修改" key="2" size="large">
                                <Divider plain>基本信息</Divider>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        姓名
                                    </Col>
                                    <Col>
                                        <Input placeholder="刘小米"/>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        头像
                                    </Col>
                                    <Col>
                                        <div>
                                            <Upload name="logo" action="/upload.do" listType="picture">
                                                <Button icon={<UploadOutlined/>}>点击上传头像</Button>
                                            </Upload>
                                        </div>
                                        <br/>
                                        <div>
                                            <Avatar size={128} icon={<UserOutlined/>}/>
                                        </div>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        平台角色
                                    </Col>
                                    <Col>
                                        <Input placeholder="学生"/>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        人员编号
                                    </Col>
                                    <Col>
                                        <Input placeholder="3180000000"/>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        系级
                                    </Col>
                                    <Col>
                                        <Input placeholder="计算机科学与技术学院"/>
                                    </Col>
                                </Row>
                                <br/>
                                <Divider plain>账号绑定</Divider>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        Email
                                    </Col>
                                    <Col>
                                        <Input placeholder="33180000000@zju.edu.cn"/>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col span={2}></Col>
                                    <Col span={8}>
                                        手机号码
                                    </Col>
                                    <Col>
                                        <Input placeholder="13700000000"/>
                                    </Col>
                                </Row>
                                <br/>
                                <Button>确定修改</Button>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={4}>
                    </Col>
                </Row>


            </>


        );
    }
}

export default UserInfoPage;

