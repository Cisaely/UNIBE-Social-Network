import logoImage from 'figma:asset/6d69a58483b11003f698135aa59ff9f0bf96fac3.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  return (
    <img 
      src={logoImage} 
      alt="UNIBE Logo" 
      className={`${sizes[size]} ${className}`}
    />
  );
}
