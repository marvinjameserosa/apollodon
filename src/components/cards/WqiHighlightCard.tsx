import { waterQualityData, wqiComponents, getWqiLabel } from '@/lib/data/data';
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { PieChartColor, COLORS } from '@/lib/colors/colors';

const WaterQualityDashboard = () => {
    return (
      <div className="mb-6">
        <Card className="border-0 overflow-hidden shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-blue-800 to-teal-800"></div>
          <CardContent className="p-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-around">
              <div className="flex flex-col justify-center">
                <h2 className="text-lg font-medium text-cyan-100 mb-1">Water Quality Index</h2>
                <div className="text-5xl font-bold text-white mb-2">82</div>
                <Badge className="bg-teal-500 hover:bg-teal-600 text-white w-fit">{getWqiLabel(82)}</Badge>
                <p className="text-cyan-200 text-sm mt-2 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" /> Last updated: Today, 10:45 AM
                </p>
              </div>
              
              <div className="md:col-span-2">
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cyan-100">WQI Trend (Last 6 Months)</span>
                  </div>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={waterQualityData}>
                        <defs>
                          <linearGradient id="wqiGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0891b2" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0d9488" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" tick={{ fill: 'white' }} />
                        <YAxis domain={[50, 100]} tick={{ fill: 'white' }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'rgba(6,78,59,0.9)', border: 'none', borderRadius: '4px' }}
                          itemStyle={{ color: 'white' }}
                          labelStyle={{ color: 'white' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="wqi" 
                          stroke="#0d9488" 
                          strokeWidth={3}
                          fill="url(#wqiGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-20 px-2">
              {wqiComponents.map((comp) => (
                <div key={comp.name} className="text-center p-2 sm:p-4">
                  <div className="text-xs font-medium mb-2 text-cyan-100">{comp.name}</div>
                  <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 aspect-square">
                    <div className="absolute inset-0 rounded-full border border-white/20"></div>
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(${
                          PieChartColor[comp.name] ?? COLORS.neutral
                        } 0% ${comp.value}%, rgba(255,255,255,0.05) ${comp.value}% 100%)`,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-base sm:text-lg md:text-xl">
                        {comp.value}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default WaterQualityDashboard;