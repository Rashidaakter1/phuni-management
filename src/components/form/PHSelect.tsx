import { Form, Select } from 'antd'

import { Controller } from 'react-hook-form'

export type TPHSelectProps = {
    name: string,
    label: string,
    options: { value: string; label: string; disabled?: boolean }[] | undefined,
    disabled?: boolean;
    mode?: 'multiple' | undefined;
}


const PHSelect = ({ name, label, options, disabled, mode }: TPHSelectProps) => {
    return (
        <>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (<Form.Item label={label}>
                    <Select
                        mode={mode}
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