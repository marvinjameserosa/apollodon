import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
  
interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  trending?: boolean;
  colorScheme: 'blue' | 'green' | 'amber' | 'rose';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, trending, colorScheme }) => {
  const colorMap = {
    blue: {
      accent: "bg-blue-600",
      background: "bg-blue-50",
      title: "text-blue-900",
      value: "text-blue-800",
      text: "text-blue-700",
      gradient: "from-blue-100 to-blue-300"
    },
    green: {
      accent: "bg-green-600",
      background: "bg-green-50",
      title: "text-green-900",
      value: "text-green-800",
      text: "text-green-700",
      gradient: "from-green-100 to-green-300"
    },
    amber: {
      accent: "bg-amber-600",
      background: "bg-amber-50",
      title: "text-amber-900",
      value: "text-amber-800",
      text: "text-amber-700",
      gradient: "from-amber-100 to-amber-300"
    },
    rose: {
      accent: "bg-rose-600",
      background: "bg-rose-50",
      title: "text-rose-900",
      value: "text-rose-800",
      text: "text-rose-700",
      gradient: "from-rose-100 to-rose-300"
    }
  };

  const colors = colorMap[colorScheme];

  return (
    <Card className={`relative flex flex-col justify-between border-0 rounded-2xl shadow-lg overflow-hidden ${colors.background}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-20`}></div>
      <div className={`h-1 ${colors.accent}`}></div>
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className={`text-base font-semibold ${colors.title}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 space-y-1">
        <div className={`text-4xl font-bold ${colors.value}`}>{value}</div>
        <p className={`text-sm flex items-center ${colors.text}`}>
          {trending && <TrendingUp className="h-4 w-4 mr-1" />} {subtitle}
        </p>
      </CardContent>
    </Card>
  );
};

const OverviewCard: React.FC = () => {
  const waterQualityData = [
    { title: 'pH Level', value: '7.2', subtitle: 'Normal range', colorScheme: 'blue' },
    { title: 'Dissolved Oxygen', value: '8.4 mg/L', subtitle: 'Normal range', trending: true, colorScheme: 'green' },
    { title: 'Turbidity', value: '5.2 NTU', subtitle: 'Within normal limits', colorScheme: 'amber' },
    { title: 'Water Temperature', value: '16°C', subtitle: 'Seasonal average', colorScheme: 'rose' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
      {waterQualityData.map((stat, index) => (
        <StatCard 
          key={index}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          trending={stat.trending}
          colorScheme={stat.colorScheme as 'blue' | 'green' | 'amber' | 'rose'}
        />
      ))}
    </div>
  );
};

export default OverviewCard;