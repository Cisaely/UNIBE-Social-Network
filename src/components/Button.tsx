interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  fullWidth = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = "px-6 py-2.5 rounded-lg transition-all duration-200 hover:shadow-md";
  
  const variantClasses = {
    primary: "bg-[#0066CC] text-white hover:bg-[#0052A3]",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </button>
  );
}
