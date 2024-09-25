import { Button } from "antd"
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import verifyToken from "../utils/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";


const Login = () => {
  
  const dispatch = useAppDispatch()
  const [userData] = useLoginMutation()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: '2025020002',
      password: 'student123',
    },
  });

  const onSubmit = async (values: any) => {
    const userInfo = {
      id: values.userId,
      password: values.password
    }
    const response = await userData(userInfo).unwrap();
    const user = verifyToken(response.data.accessToken)
    const credentials = {
      user: user,
      token: response.data.accessToken
    }
    dispatch(setUser(credentials))

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID: </label>
        <input type="text" id="id" {...register('userId')} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" {...register('password')} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  )
}

export default Login