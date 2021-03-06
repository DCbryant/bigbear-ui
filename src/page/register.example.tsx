import React, { useState } from "react";
import { Form, Input, Button, message, Icon, useForm } from "../index";
import { linkTo } from "@storybook/addon-links";
function Register() {
	const [state, setState] = useState();
	const [handleSubmit, callbackObj, validate, blurObj] = useForm([
		{
			name: "username",
			validate: [{ validate: (e) => e !== "", message: "用户名不能为空" }]
		},
		{
			name: "password",
			validate: [
				{ validate: (e) => e !== "", message: "密码不为空" },
				{
					validate: (e) => {
						setState(e);
						return e.length > 2 && e.length < 7;
					},
					message: "密码必须大于2位或者小于7位"
				}
			]
		},
		{
			name: "confirmPassword",
			validate: [
				{ validate: (e) => e !== "", message: "确认密码不为空" },
				{
					validate: (e) => e === state,
					message: "确认密码与密码不一致"
				}
			]
		},
		{
			name: "email",
			validate: [
				{ validate: (e) => e !== "", message: "邮箱不为空" },
				{
					validate: (e) =>
						/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.exec(e) ? true : false,
					message: "邮箱要满足邮箱格式"
				}
			]
		}
	]);
	const onSubmit = (data: any) => {
		if (
			validate.username.length === 0 &&
			validate.password.length === 0 &&
			data &&
			data.username &&
			data.password &&
			data.confirmPassword
		) {
			console.log(data);
			message.info("进入发送注册逻辑");
		} else {
			message.danger("验证失败", {});
		}
	};
	return (
		<>
			<div
				className="bigbear-layout-block-default"
				style={{ textAlign: "center", fontWeight: 700, padding: "20px" }}
			>
				用户注册
			</div>
			<Form>
				<Input
					prepend={<Icon icon="user"></Icon>}
					callback={(e) => callbackObj.username(e.target.value)}
					onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
						blurObj.username(e.target.value);
					}}
					placeholder="用户名"
				></Input>
				<div className="bigbear-form-validate">
					{validate.username.map((v: string) => v)}
				</div>
				<Input
					prepend={<Icon icon="lock"></Icon>}
					type="password"
					callback={(e) => callbackObj.password(e.target.value)}
					onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
						blurObj.password(e.target.value);
					}}
					placeholder="密码"
				></Input>
				<div className="bigbear-form-validate">
					{validate.password.map((v: string, i: number) => (
						<div key={i}>{v}</div>
					))}
				</div>
				<Input
					prepend={<Icon icon="lock"></Icon>}
					type="password"
					callback={(e) => callbackObj.confirmPassword(e.target.value)}
					onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
						blurObj.confirmPassword(e.target.value);
					}}
					placeholder="确认密码"
				></Input>
				<div className="bigbear-form-validate">
					{validate.confirmPassword.map((v: string, i: number) => (
						<div key={i}>{v}</div>
					))}
				</div>
				<Input
					prepend={<Icon icon="envelope"></Icon>}
					callback={(e) => callbackObj.email(e.target.value)}
					onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
						blurObj.email(e.target.value);
					}}
					placeholder="邮箱"
				></Input>
				<div className="bigbear-form-validate">
					{validate.email.map((v: string, i) => (
						<div key={i}>{v}</div>
					))}
				</div>
				<div>
					<Button
						style={{ width: "100%", marginBottom: "20px" }}
						btnType="info"
						onClick={() => {
							handleSubmit(onSubmit);
						}}
					>
						注册
					</Button>
					<Button
						style={{ width: "100%" }}
						btnType="success"
						onClick={linkTo("PAGE | Login Page 登录页", "default")}
					>
						马上登录
					</Button>
				</div>
			</Form>
		</>
	);
}
export default Register;
