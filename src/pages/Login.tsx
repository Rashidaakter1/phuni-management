import { Button } from "antd"
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import verifyToken from "../utils/verifyToken";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [userData] = useLoginMutation()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: 'A-0001',
      password: 'admin123',
    },
  });

  const onSubmit = async (values: any) => {
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