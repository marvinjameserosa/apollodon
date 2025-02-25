import { AlertTriangle, Download, Info, RefreshCw, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { waterQualityData, stationData, wqiComponents, getWqiLabel } from '@/lib/data/data';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { COLORS } from '@/lib/colors/colors';

interface WqiComponent {
  name: string;
  value: number;
  color?: string;  
}

type WQIValue = number;
type StationStatus = 'Normal' | 'Warning' | 'Critical';

const getWqiBackgroundClass = (wqi: WQIValue): string => {
  if (wqi >= 80) return 'bg-emerald-500';
  if (wqi >= 70) return 'bg-cyan-500';
  if (wqi >= 60) return 'bg-amber-500';
  return 'bg-red-500';
};

const getStatusBadgeClass = (status: StationStatus): string => {
  switch (status) {
    case 'Normal':
      return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    case 'Warning':
      return 'bg-amber-100 text-amber-800 border border-amber-200';
    default:
      return 'bg-red-100 text-red-800 border border-red-200';
  }
};

const MainTabs = () => {
  const typedWqiComponents = wqiComponents as WqiComponent[];

  return (
    <div className="space-y-4">
      <Tabs 
        defaultValue="overview" 
        className="space-y-4"
      >
        <div className="overflow-x-auto sm:overflow-visible">
          <TabsList className="bg-white border border-slate-200 flex-nowrap sm:flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">Data Analysis</TabsTrigger>
            <TabsTrigger value="predictive">Predictive Models</TabsTrigger>
            <TabsTrigger value="stations">Monitoring Stations</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-4">
          <Card className="border border-slate-200">
            <div className="h-1 bg-gradient-to-r from-cyan-500 to-sky-500"></div>
            <CardHeader>
              <CardTitle className="text-slate-800">Water Quality Trends</CardTitle>
              <CardDescription>Historical measurements across key parameters</CardDescription>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" className="text-sm gap-1 border-slate-200">
                  <Download className="h-4 w-4" /> Export Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={waterQualityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: COLORS.light, borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="ph" stroke={COLORS.info} strokeWidth={2} />
                    <Line type="monotone" dataKey="dissolved_oxygen" stroke={COLORS.success} strokeWidth={2} />
                    <Line type="monotone" dataKey="turbidity" stroke={COLORS.secondary} strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="temperature" stroke={COLORS.neutral} strokeWidth={2} />
                    <Line type="monotone" dataKey="wqi" stroke={COLORS.primary} strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-slate-200">
              <div className="h-1 bg-gradient-to-r from-sky-500 to-cyan-500"></div>
              <CardHeader>
                <CardTitle className="text-slate-800">Monitoring Stations Status</CardTitle>
                <CardDescription>Real-time connection and data status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stationData.map(station => (
                    <div key={station.id} className="flex items-center justify-between p-3 border border-slate-200 rounded bg-white shadow-sm">
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{station.name}</p>
                        <p className="text-sm text-slate-500">Last reading: {station.lastReading}</p>
                        <div className="mt-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-slate-500">WQI: {station.wqi}</span>
                            <span className={`text-xs ${
                              station.wqi >= 80 ? 'text-emerald-600' :
                              station.wqi >= 70 ? 'text-cyan-600' :
                              station.wqi >= 60 ? 'text-amber-600' :
                              'text-red-600'
                            }`}>{getWqiLabel(station.wqi)}</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded overflow-hidden">
                            <div 
                              className={`h-full ${getWqiBackgroundClass(station.wqi)}`} 
                              style={{ width: `${station.wqi}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusBadgeClass(station.status as StationStatus)}>
                        {station.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200">
              <div className="h-1 bg-gradient-to-r from-amber-500 to-red-500"></div>
              <CardHeader>
                <CardTitle className="text-slate-800">Recent Alerts</CardTitle>
                <CardDescription>Parameter threshold violations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded">
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800">WQI Decline Warning</p>
                      <p className="text-sm text-amber-700">Station Beta reported WQI 68 (below standard threshold)</p>
                      <p className="text-xs text-amber-600 mt-1">Today, 09:42 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded">
                    <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Critical WQI Alert</p>
                      <p className="text-sm text-red-700">Station Delta reported WQI 55 (critical threshold)</p>
                      <p className="text-xs text-red-600 mt-1">Yesterday, 11:23 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" className="text-sm text-slate-600 hover:text-slate-800">View all alerts</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="predictive" className="space-y-4">
          <Card className="border border-slate-200 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-slate-800">Predictive Model: Water Quality Index</CardTitle>
                  <CardDescription>Forecast for next 30 days based on historical patterns and environmental factors</CardDescription>
                </div>
                <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" /> Update Model
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={waterQualityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[50, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: COLORS.light, borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="wqi" name="Actual WQI" stroke={COLORS.primary} strokeWidth={2} />
                    <Line type="monotone" dataKey="predicted_wqi" name="Predicted WQI" stroke={COLORS.success} strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-cyan-100 bg-cyan-50">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-sm font-medium text-cyan-800 flex items-center gap-1">
                      <Info className="h-4 w-4" /> WQI Forecast
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-cyan-700">
                      The model predicts a slight decline in WQI over the next month, with an estimated 3% decrease due to seasonal factors.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border border-emerald-100 bg-emerald-50">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-sm font-medium text-emerald-800 flex items-center gap-1">
                      <Info className="h-4 w-4" /> Key Influencers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-emerald-700">
                      Primary factors affecting the forecast: increased rainfall (65% impact), temperature rise (25% impact), and upstream activities (10% impact).
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border border-sky-100 bg-sky-50">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-sm font-medium text-sky-800 flex items-center gap-1">
                      <Info className="h-4 w-4" /> Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-sky-700">
                      Increase monitoring frequency at Station Beta and Delta. Consider preemptive treatment measures to maintain quality standards.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" size="sm" className="border-slate-200 text-slate-600">Model Parameters</Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Run Detailed Analysis</Button>
            </CardFooter>
          </Card>
          
          <Card className="border border-slate-200">
            <div className="h-1 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
            <CardHeader>
              <CardTitle className="text-slate-800">WQI Component Analysis</CardTitle>
              <CardDescription>Breakdown of factors contributing to the Water Quality Index</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typedWqiComponents}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {typedWqiComponents.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || COLORS.primary} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: COLORS.light, borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-800">Component Sensitivity</h4>
                  <p className="text-sm text-slate-600 mb-4">How changes in each parameter impact the overall WQI score</p>
                  
                  {typedWqiComponents.map(comp => (
                    <div key={comp.name} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">{comp.name}</span>
                        <span className="text-sm text-slate-500">{comp.value}% weight</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded overflow-hidden">
                        <div 
                          className="h-full rounded" 
                          style={{ width: `${comp.value}%`, backgroundColor: comp.color || COLORS.primary }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="text-xs border-slate-200 text-slate-600 flex items-center gap-1">
                      Component Details <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analysis tab content */}
        <TabsContent value="analysis" className="space-y-4">
          <Card className="border border-slate-200">
            <div className="h-1 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
            <CardHeader>
              <CardTitle className="text-slate-800">Data Analysis Dashboard</CardTitle>
              <CardDescription>Comprehensive analysis of water quality parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-gray-500">
                <p>Analysis dashboard content here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Stations tab content */}
        <TabsContent value="stations" className="space-y-4">
          <Card className="border border-slate-200">
            <div className="h-1 bg-gradient-to-r from-amber-500 to-sky-500"></div>
            <CardHeader>
              <CardTitle className="text-slate-800">Monitoring Stations Management</CardTitle>
              <CardDescription>Configuration and status of all monitoring points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-gray-500">
                <p>Stations management content here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Alerts tab content */}
        <TabsContent value="alerts" className="space-y-4">
          <Card className="border border-slate-200">
            <div className="h-1 bg-gradient-to-r from-amber-500 to-red-500"></div>
            <CardHeader>
              <CardTitle className="text-slate-800">System Alerts Dashboard</CardTitle>
              <CardDescription>Critical notifications and threshold violations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-gray-500">
                <p>Alerts dashboard content here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainTabs;
