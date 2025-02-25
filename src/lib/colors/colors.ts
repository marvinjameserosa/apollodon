export interface ColorPalette {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    neutral: string;
    light: string;
    dark: string;
  }
  
  export interface TailwindHeaderColors {
    from: string;
    via: string;
    to: string;
    icon: string;
  }
  
  export interface TailwindUIColors {
    white: string;
    whiteTransparent10: string;
    whiteTransparent20: string;
  }
  
  export interface TailwindStatusColor {
    bg: string;
    text: string;
  }
  
  export interface TailwindStatusColors {
    excellent: TailwindStatusColor;
    good: TailwindStatusColor;
    fair: TailwindStatusColor;
    poor: TailwindStatusColor;
  }
  
  export interface TailwindColors {
    header: TailwindHeaderColors;
    ui: TailwindUIColors;
    status: TailwindStatusColors;
  }
  
  export interface SemanticToTailwindMapping {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    neutral: string;
    light: string;
    dark: string;
  }
  
  // Base colors
  export const COLORS: ColorPalette = {
    primary: '#0891b2', // Cyan-600
    secondary: '#0ea5e9', // Sky-500
    success: '#10b981', // Emerald-500
    warning: '#f59e0b', // Amber-500
    danger: '#ef4444', // Red-500
    info: '#6366f1', // Indigo-500
    neutral: '#64748b', // Slate-500
    light: '#f8fafc', // Slate-50
    dark: '#334155', // Slate-700
  };
  
  export const tailwindColors: TailwindColors = {
    header: {
      from: 'cyan-900', 
      via: 'blue-800',  
      to: 'teal-800',  
      icon: 'cyan-300', 
    },
    
    ui: {
      white: 'white',
      whiteTransparent10: 'white/10',
      whiteTransparent20: 'white/20',
    },
    
    status: {
      excellent: {
        bg: 'emerald-100',
        text: 'emerald-800',
      },
      good: {
        bg: 'sky-100',
        text: 'sky-800',
      },
      fair: {
        bg: 'amber-100',
        text: 'amber-800',
      },
      poor: {
        bg: 'red-100',
        text: 'red-800',
      },
    }
  };
  
  export type WQIValue = number;
  
  export const getWqiStatusColor = (wqi: WQIValue): TailwindStatusColor => {
    if (wqi >= 80) return {
      bg: tailwindColors.status.excellent.bg,
      text: tailwindColors.status.excellent.text,
    };
    if (wqi >= 70) return {
      bg: tailwindColors.status.good.bg,
      text: tailwindColors.status.good.text,
    };
    if (wqi >= 60) return {
      bg: tailwindColors.status.fair.bg,
      text: tailwindColors.status.fair.text,
    };
    return {
      bg: tailwindColors.status.poor.bg,
      text: tailwindColors.status.poor.text,
    };
  };
  
  export const semanticToTailwind: SemanticToTailwindMapping = {
    primary: 'cyan-600',
    secondary: 'sky-500',
    success: 'emerald-500',
    warning: 'amber-500',
    danger: 'red-500',
    info: 'indigo-500',
    neutral: 'slate-500',
    light: 'slate-50',
    dark: 'slate-700',
  };

  export const PieChartColor: Record<string, string> = {
    'pH': COLORS.primary,
    'Dissolved Oxygen': COLORS.secondary,
    'Turbidity': COLORS.warning,
    'Temperature': COLORS.success,
  };

  
