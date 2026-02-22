import PropTypes from 'prop-types';

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[var(--background)] transition-all duration-300 ease-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  // Radius: Light Mode = 40px, Dark Mode = 32px
  const radiusStyles = "rounded-[40px] dark:rounded-[32px]";
  
  // Hover Transform: Light = translateY(-3px), Dark = translateY(-4px) scale(1.01)
  const hoverStyles = "hover:-translate-y-[3px] dark:hover:-translate-y-[4px] dark:hover:scale-[1.01]";

  const variants = {
    primary: "bg-[var(--accent)] text-white hover:shadow-lg dark:bg-[var(--dark-accent)] dark:text-white focus:ring-[var(--accent)] dark:focus:ring-[var(--dark-accent)]",
    secondary: "bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--accent)]/5 dark:bg-[var(--dark-card)] dark:text-[var(--dark-foreground)] dark:hover:bg-[var(--dark-accent)]/10 dark:border-[var(--dark-border)]",
    ghost: "bg-transparent text-[var(--text-primary)] hover:bg-[var(--accent-soft)] dark:text-[var(--dark-text-primary)] dark:hover:bg-[var(--dark-accent-soft)] hover:translate-y-0 dark:hover:translate-y-0 dark:hover:scale-100", // Override transform for ghost
  };

  return (
    <button 
      className={`${baseStyles} ${radiusStyles} ${variants[variant].includes('hover:translate-y-0') ? '' : hoverStyles} ${variants[variant]} ${className} px-6 py-3`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  className: PropTypes.string,
};
