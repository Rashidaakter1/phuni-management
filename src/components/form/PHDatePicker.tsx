import { DatePicker, Form, } from "antd"
import { Controller } from "react-hook-form"

type TPHDatePickerProps = {
    name: string,
    label: string,
    format?: string
}

const PHDatePicker = ({ name, label, format }: TPHDatePickerProps) => {
    return (
        <div style={{ marginBottom: "12px" }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <DatePicker {...field} id={name} format={format} size="large" style={{ width: "100%" }} />
                        {error && <small style={{ color: 'red' }}>{error.message}</small>}
                    </Form.Item>
                )}
            />
        </div>
    )
}

export default PHDatePicker