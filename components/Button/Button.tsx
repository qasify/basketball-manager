import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'icon'
}

const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
  const baseStyles = 'px-4 py-2 font-semibold '
  const variantStyles = {
    primary: 'bg-orange-600 text-white hover:bg-orange-700 rounded-md',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md',
    outline: 'border border-orange-600 text-orange-600 hover:bg-orange-50 rounded-md',
    icon: 'hover:bg-gray-100 rounded-full min-w-0 px-2 py-2'
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className} `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button