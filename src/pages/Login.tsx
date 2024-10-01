import { Button, Col, Flex } from "antd"
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import verifyToken from "../utils/verifyToken";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [userData] = useLoginMutation()

  const values = {
    userId: "A-0001",
    password: "admin123"
  }

  const onSubmit = async (values: any) => {
    console.log(values)
    const toastId = toast.loading('Logging in');
    try {
      const userInfo = {
        id: values.userId,
        password: values.password
      }
      const response = await userData(userInfo).unwrap();
      const user = (verifyToken(response.data.accessToken)) as TUser
      const credentials = {
        user: user,
        token: response.data.accessToken
      }
      dispatch(setUser(credentials))
      toast.success("You have logged in successfully", { id: toastId, duration: 2000 })
      navigate(`/${user.role}/dashboard`)
    } catch (error) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  }
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Col span={6}>
        <PHForm defaultValues={values} onSubmit={onSubmit}>
          < >
            <PHInput name="userId" type="text" label="User Id" />
            <PHInput name="password" type="password" label="Password" />
            <Button htmlType="submit">Login</Button>
          </>
        </PHForm>
      </Col>
    </Flex>
  )
}

export default Login