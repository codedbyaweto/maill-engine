type Props = {
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: any;
    onBlur?: any;
    error?: string;
    leftIcon?: React.ReactNode;   // 👈 NEW
    rightIcon?: React.ReactNode;  // 👈 NEW
};

const BaseFormField = ({
                           name,
                           type = "text",
                           placeholder,
                           value,
                           onChange,
                           onBlur,
                           error,
                           leftIcon,
                           rightIcon,
                       }: Props) => {
    return (
        <div className="w-full">
            <div className="relative">

                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {leftIcon}
                    </div>
                )}

                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`w-full py-2 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none rounded-lg ${
                        leftIcon ? "pl-10" : "pl-3"
                    } ${rightIcon ? "pr-10" : "pr-3"}`}
                />

                {rightIcon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {rightIcon}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default BaseFormField;