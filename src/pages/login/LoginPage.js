import { Form, Input, Checkbox, Button } from 'antd';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.scss";

import accountApi from '../../api/apis/account'

function mapStateToProps (state) {
    return {
        accessToken: state.accessToken
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setAccessToken (accessToken) {
            dispatch({
                type: "set_access_token",
                value: accessToken
            })
        }
    }
}

function LoginPage (props) {
    let [form] = Form.useForm();

    const navigate = useNavigate();


    const onFinish = () => {}
    const onFinishFailed = () => {}
    const login = async () => {
        const formValue = await form.validateFields();
        console.log(formValue);
        accountApi.login({
            "account": formValue.account,
            "password": formValue.password
        }).then(res => {
            console.log("login res: ", res);
            props.setAccessToken(res.data.accessToken);
            navigate('/article-list')
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="login-page">
            <div className="login-form">
                <div className="form-title">
                    登录
                </div>
                <div className="form-area">
                    <Form
                        form={form}
                        name="loginForm"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        initialValues={{ remeber: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Account"
                            name="account"
                            rules={[{ required: true, message: 'Please input your account!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                            <Button type="primary" onClick={login}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

// export default LoginPage;
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);