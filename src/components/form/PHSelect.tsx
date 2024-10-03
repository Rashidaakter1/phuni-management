import { Form, Select } from 'antd'

import { Controller } from 'react-hook-form'

export type TPHSelectProps = {
    name: string,
    label: string,
    options: { value: string; label: string; disabled?: boolean }[] | undefined,
    disabled?: boolean
}


const PHSelect = ({ name, label, options, disabled }: TPHSelectProps) => {
    return (
        <>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (<Form.Item label={label}>
                    <Select
                        {...field}
                        disabled={disabled}
                        style={{ width: "100%" }}
                        options={options}
                        size="large"
                    />
                    {error && <small style={{ color: 'red' }}>{error.message}</small>}
                </Form.Item>)}


            />
        </>
    )
}

export default PHSelect