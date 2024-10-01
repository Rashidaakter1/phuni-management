import { Form, Input } from "antd"
import { Controller } from "react-hook-form"

type TPHInputProps = {
  name: string,
  label: string,
  type: string,
}

const PHInput = ({ name, label, type }: TPHInputProps) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} size="large" />
            {error && <small style={{ color: 'red' }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  )
}

export default PHInput